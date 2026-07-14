'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Mail, 
  Users as UsersIcon, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  User as UserIcon,
  LogOut,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  Download,
  AlertTriangle,
  X,
  Copy,
  Upload,
  Globe,
  Lock,
  Menu,
  ChevronLeft,
  ChevronRight,
  Shield,
  Info
} from 'lucide-react';
import { 
  getBlogs, addBlog, updateBlog, deleteBlog,
  getContacts, addContact, updateContact, deleteContact,
  getUsers, addUser, updateUser, deleteUser,
  getSettings, saveSettings,
  getMedia, addMedia, deleteMedia,
  getNotifications, markNotificationsAsRead, clearNotifications,
  getActivityLogs, addActivityLog,
  getSession, clearSession,
  checkRateLimit
} from '@/lib/storage';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, blogs, contacts, users, media, settings, profile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lists State
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [media, setMedia] = useState([]);
  const [settings, setSettings] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  // Toast / Status state
  const [toast, setToast] = useState({ message: '', type: '' }); // type: success, error, info
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals & Forms State

  const [editingBlog, setEditingBlog] = useState(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', tags: '',
    status: 'Published', publishDate: '', seoTitle: '', seoDescription: '', image: '', gallery: []
  });

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [viewingContact, setViewingContact] = useState(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({ name: '', email: '', password: '', role: 'Editor', profileImage: '' });

  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  const [mediaSelectorTarget, setMediaSelectorTarget] = useState(''); // 'image' or 'gallery'
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState([
    'Waste Management',
    'Circular Economy',
    'Community Development',
    'Climate Action'
  ]);

  // Authentication & Route protection check
  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push('/admin');
    } else {
      setCurrentUser(session);
      loadAllData();
    }
  }, [router]);

  // Load all data (from D1 API in production, localStorage in local dev)
  const loadAllData = async () => {
    try {
      const [blogsData, contactsData, usersData, mediaData, settingsData, notifsData, logsData] = await Promise.all([
        getBlogs(),
        getContacts(),
        getUsers(),
        getMedia(),
        getSettings(),
        getNotifications(),
        getActivityLogs(),
      ]);
      setBlogs(blogsData || []);
      setContacts(contactsData || []);
      setUsers(usersData || []);
      setMedia(mediaData || []);
      setSettings(settingsData || {});
      setNotifications(notifsData || []);
      setActivityLogs(logsData || []);

      if (settingsData && settingsData.categories) {
        try {
          setCategories(JSON.parse(settingsData.categories));
        } catch (e) {
          console.error('Failed to parse categories:', e);
        }
      }
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const handleLogout = () => {
    if (currentUser) {
      addActivityLog(currentUser.name, 'Logout', 'Logged out of administrator panel');
    }
    clearSession();
    router.push('/admin');
  };

  // --- ROLE BASED ACCESS CHECK ---
  const hasPermission = (action) => {
    if (!currentUser) return false;
    const role = currentUser.role;

    // Super Admin can do everything
    if (role === 'Super Admin') return true;

    // Admin permissions
    if (role === 'Admin') {
      if (action === 'delete_user') return false; // Only Super Admin can delete users
      return true;
    }

    // Editor permissions
    if (role === 'Editor') {
      // Editor can only view dashboard, manage blogs (create/edit, no delete), and edit own profile
      if (action === 'manage_blogs' || action === 'edit_profile' || action === 'view_dashboard') return true;
      return false;
    }

    return false;
  };

  // --- BLOGS HANDLERS ---
  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: '', slug: '', excerpt: '', content: '',
      category: categories[0] || 'Waste Management', tags: 'Waste Management, Recycling',
      status: 'Published', publishDate: new Date().toISOString().substring(0, 16),
      seoTitle: '', seoDescription: '', image: '', gallery: []
    });
    setActiveTab('create-blog');
  };

  const openEditBlogModal = (blog) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'Waste Management',
      tags: blog.tags ? blog.tags.join(', ') : '',
      status: blog.status || 'Published',
      publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().substring(0, 16) : new Date().toISOString().substring(0, 16),
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      image: blog.image || '',
      gallery: blog.gallery || []
    });
    setActiveTab('edit-blog');
  };

  const handleSaveCategories = async (newCategories) => {
    const updatedSettings = {
      ...settings,
      categories: JSON.stringify(newCategories)
    };
    try {
      await saveSettings(updatedSettings);
      setSettings(updatedSettings);
      setCategories(newCategories);
      showToast('Categories updated successfully.');
    } catch (e) {
      showToast('Failed to save categories.', 'error');
    }
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const cleanName = newCategoryName.trim();
    if (!cleanName) return;

    if (categories.includes(cleanName)) {
      showToast('Category already exists.', 'error');
      return;
    }

    const updated = [...categories, cleanName];
    handleSaveCategories(updated);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (catName) => {
    if (confirm(`Are you sure you want to delete the category "${catName}"? This will not delete the blog posts in this category, but they will be categorized under the default category.`)) {
      const updated = categories.filter(c => c !== catName);
      handleSaveCategories(updated);
    }
  };

  const handleBlogTitleChange = (val) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    setBlogFormData(prev => ({
      ...prev,
      title: val,
      slug: slug,
      seoTitle: `${val} | Uboontu Foundation`
    }));
  };

  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();
    if (!blogFormData.title || !blogFormData.content) {
      showToast('Title and Content are required.', 'error');
      return;
    }

    // Auto-generate excerpt by stripping HTML tags from content body
    let plainText = '';
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(blogFormData.content, 'text/html');
      plainText = (doc.body.textContent || '').trim();
    } else {
      plainText = blogFormData.content.replace(/<[^>]*>/g, '').trim();
    }
    const autoExcerpt = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');

    const processedBlog = {
      ...blogFormData,
      excerpt: autoExcerpt,
      tags: blogFormData.tags ? blogFormData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      publishDate: new Date(blogFormData.publishDate).toISOString(),
      readTime: `${Math.max(1, Math.ceil(blogFormData.content.split(' ').length / 200))} min read`
    };

    if (editingBlog) {
      await updateBlog(editingBlog.id, processedBlog, currentUser.name);
      showToast('Blog post updated successfully.');
    } else {
      await addBlog(processedBlog, currentUser.name);
      showToast('New blog post created successfully.');
    }

    setActiveTab('blogs');
    loadAllData();
  };

  const handleDeleteBlog = async (id) => {
    if (!hasPermission('delete_blog')) {
      showToast('Action Denied: You do not have permissions to delete blog posts.', 'error');
      return;
    }
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id, currentUser.name);
      showToast('Blog post deleted successfully.');
      loadAllData();
    }
  };

  // --- CONTACTS HANDLERS ---
  const handleViewContact = async (contact) => {
    setViewingContact(contact);
    setIsContactModalOpen(true);
    if (!contact.isRead) {
      await updateContact(contact.id, { isRead: true });
      loadAllData();
    }
  };

  const handleDeleteContact = async (id) => {
    if (!hasPermission('delete_contact')) {
      showToast('Action Denied: You do not have permission to delete contact submissions.', 'error');
      return;
    }
    if (confirm('Are you sure you want to delete this contact submission?')) {
      await deleteContact(id);
      showToast('Contact submission deleted successfully.');
      loadAllData();
    }
  };

  const handleReplyContact = async (id) => {
    await updateContact(id, { replyStatus: 'Replied' });
    showToast('Reply marked as sent successfully.');
    addActivityLog(currentUser.name, 'Contact Reply', `Sent reply to submission ID: ${id}`);
    setIsContactModalOpen(false);
    loadAllData();
  };

  const handleToggleReadContact = async (id, isRead) => {
    await updateContact(id, { isRead: !isRead });
    showToast(`Marked submission as ${!isRead ? 'read' : 'unread'}.`);
    loadAllData();
  };

  const handleExportContactsCSV = () => {
    if (contacts.length === 0) {
      showToast('No contact submissions to export.', 'error');
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Read', 'Reply Status'];
    const rows = contacts.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      c.email,
      c.phone || '',
      `"${c.subject.replace(/"/g, '""')}"`,
      `"${c.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      c.date,
      c.isRead ? 'Yes' : 'No',
      c.replyStatus
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `uboontu_contact_submissions_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Contact submissions exported as CSV successfully.');
    addActivityLog(currentUser.name, 'Export CSV', 'Exported contact form submissions to CSV');
  };

  // --- USER HANDLERS ---
  const openNewUserModal = () => {
    if (!hasPermission('manage_users')) {
      showToast('Action Denied: You do not have permissions to manage users.', 'error');
      return;
    }
    setEditingUser(null);
    setUserFormData({ name: '', email: '', password: '', role: 'Editor', profileImage: '' });
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (user) => {
    if (!hasPermission('manage_users')) {
      showToast('Action Denied: You do not have permissions to manage users.', 'error');
      return;
    }
    setEditingUser(user);
    setUserFormData({ name: user.name, email: user.email, password: user.password, role: user.role, profileImage: user.profileImage });
    setIsUserModalOpen(true);
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email || !userFormData.password) {
      showToast('Name, Email and Password are required.', 'error');
      return;
    }
    if (editingUser) {
      await updateUser(editingUser.id, userFormData, currentUser.name);
      showToast(`User ${userFormData.name} updated successfully.`);
    } else {
      await addUser(userFormData, currentUser.name);
      showToast(`User ${userFormData.name} added successfully.`);
    }
    setIsUserModalOpen(false);
    loadAllData();
  };

  const handleDeleteUser = async (id) => {
    if (!hasPermission('delete_user')) {
      showToast('Action Denied: Only Super Admin accounts can delete users.', 'error');
      return;
    }
    if (id === currentUser.id) {
      showToast('Action Denied: You cannot delete your own account.', 'error');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id, currentUser.name);
      showToast('User account deleted.');
      loadAllData();
    }
  };

  // --- MEDIA HANDLERS ---
  const [mockMediaUrl, setMockMediaUrl] = useState('');
  const [mockMediaName, setMockMediaName] = useState('');
  const [uploadFileDataUrl, setUploadFileDataUrl] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState(0);
  const [uploadFileType, setUploadFileType] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file only.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 1000;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
        setUploadFileDataUrl(compressedDataUrl);
        setUploadFileSize(Math.round((compressedDataUrl.length * 3) / 4));
        setUploadFileType('image/jpeg');
        setMockMediaName(file.name.split('.')[0].replace(/\s+/g, '_'));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMockUpload = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    let finalUrl = '';
    let finalSize = 0;
    let finalType = 'image/jpeg';

    if (uploadFileDataUrl) {
      finalUrl = uploadFileDataUrl;
      finalSize = uploadFileSize;
      finalType = uploadFileType || 'image/jpeg';
    } else if (mockMediaUrl) {
      finalUrl = mockMediaUrl;
      finalSize = Math.floor(Math.random() * 500000) + 100000;
      finalType = 'image/jpeg';
    } else {
      showToast('Please select a file or enter a Web URL.', 'error');
      return;
    }

    const name = mockMediaName || (uploadFileDataUrl ? 'uploaded_image' : finalUrl.split('/').pop().split('?')[0]) || 'uploaded_image';

    try {
      await addMedia({ name, url: finalUrl, type: finalType, size: finalSize }, currentUser.name);
      showToast('Media uploaded successfully.');
      setMockMediaUrl('');
      setMockMediaName('');
      setUploadFileDataUrl('');
      setUploadFileSize(0);
      setUploadFileType('');
      const fileInput = document.getElementById('device-file-input');
      if (fileInput) fileInput.value = '';
      loadAllData();
    } catch (err) {
      showToast(`Upload failed: ${err.message}`, 'error');
    }
  };

  const handleBlogFeaturedImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file only.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 1000;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
        
        // Save to media manager pool too
        const cleanName = file.name.split('.')[0].replace(/\s+/g, '_');
        const sizeBytes = Math.round((compressedDataUrl.length * 3) / 4);
        addMedia({ name: cleanName, url: compressedDataUrl, type: 'image/jpeg', size: sizeBytes }, currentUser.name)
          .then(() => {
            loadAllData();
          })
          .catch(err => console.error("Error saving media copy:", err));

        // Set to blog image form state
        setBlogFormData(prev => ({ ...prev, image: compressedDataUrl }));
        showToast('Image uploaded from device successfully!');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = async (id) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      await deleteMedia(id, currentUser.name);
      showToast('Media file deleted.');
      loadAllData();
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    showToast('File URL copied to clipboard!', 'info');
  };

  // --- WEBSITE SETTINGS HANDLER ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!hasPermission('manage_settings')) {
      showToast('Action Denied: Editors cannot update website settings.', 'error');
      return;
    }
    await saveSettings(settings, currentUser.name);
    showToast('Website configurations and SEO settings saved.');
    loadAllData();
  };

  // --- PROFILE UPDATE HANDLERS ---
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfileEmail(currentUser.email || '');
      setProfileBio(currentUser.bio || '');
      setProfilePassword(currentUser.password || '');
      setProfileImage(currentUser.profileImage || '');
      setTwoFactor(currentUser.twoFactorEnabled || false);
    }
  }, [currentUser, activeTab]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const updated = await updateUser(currentUser.id, {
      name: profileName,
      email: profileEmail,
      bio: profileBio,
      password: profilePassword,
      profileImage: profileImage,
      twoFactorEnabled: twoFactor,
      twoFactorSecret: twoFactor ? 'UBOONTU-ADMIN-SECRET-KEY-2026' : ''
    }, currentUser.name);
    
    if (updated) {
      setCurrentUser(updated);
      showToast('Admin Profile and security preferences updated.');
      loadAllData();
    }
  };

  // --- NOTIFICATION HANDLERS ---
  const handleMarkNotifRead = async () => {
    await markNotificationsAsRead();
    showToast('Notifications marked as read.');
    loadAllData();
  };

  const handleClearNotif = async () => {
    await clearNotifications();
    showToast('Notifications cleared.');
    loadAllData();
  };

  // --- MEDIA SELECTOR MODAL HELPERS ---
  const openMediaSelector = (target) => {
    setMediaSelectorTarget(target);
    if (target === 'gallery') {
      setSelectedGalleryImages(blogFormData.gallery || []);
    }
    setIsMediaSelectorOpen(true);
  };

  const selectMediaForFeatured = (url) => {
    setBlogFormData(prev => ({ ...prev, image: url }));
    setIsMediaSelectorOpen(false);
  };

  const toggleSelectMediaForGallery = (url) => {
    setSelectedGalleryImages(prev => {
      if (prev.includes(url)) {
        return prev.filter(img => img !== url);
      } else {
        return [...prev, url];
      }
    });
  };

  const confirmGallerySelection = () => {
    setBlogFormData(prev => ({ ...prev, gallery: selectedGalleryImages }));
    setIsMediaSelectorOpen(false);
  };

  // --- SEARCH AND FILTER LOGIC ---
  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = filterCategory === 'All' || b.category === filterCategory;
      const matchStatus = filterStatus === 'All' || b.status === filterStatus;
      return matchSearch && matchCat && matchStatus;
    });
  }, [blogs, searchQuery, filterCategory, filterStatus]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRead = filterStatus === 'All' || 
                        (filterStatus === 'Read' && c.isRead) ||
                        (filterStatus === 'Unread' && !c.isRead) ||
                        (filterStatus === 'Replied' && c.replyStatus === 'Replied') ||
                        (filterStatus === 'Unreplied' && c.replyStatus === 'Unreplied');
      return matchSearch && matchRead;
    });
  }, [contacts, searchQuery, filterStatus]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      return u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
             u.role.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [users, searchQuery]);

  const filteredMedia = useMemo(() => {
    return media.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [media, searchQuery]);

  // Pagination helper
  const paginatedItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  // Reset pagination on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterStatus, activeTab]);

  // Analytics Metrics
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(b => b.status === 'Published').length;
  const draftBlogs = blogs.filter(b => b.status === 'Draft').length;
  const totalSubmissions = contacts.length;
  const newMessages = contacts.filter(c => !c.isRead).length;
  const totalUsersCount = users.length;

  if (!currentUser) {
    return (
      <div className="login-container">
        <div style={{ color: 'var(--admin-text)', textAlign: 'center' }}>
          <p style={{ fontWeight: 600 }}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <span>Uboontu</span>Admin
        </div>
        <nav className="sidebar-menu">
          <div 
            className={`sidebar-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </div>

          <div 
            className={`sidebar-item ${(activeTab === 'blogs' || activeTab === 'create-blog' || activeTab === 'edit-blog') ? 'active' : ''}`}
            onClick={() => { setActiveTab('blogs'); setSidebarOpen(false); }}
          >
            <BookOpen size={18} />
            <span>Blog Management</span>
          </div>

          <div 
            className={`sidebar-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('contacts'); setSidebarOpen(false); }}
          >
            <Mail size={18} />
            <span>Contact Submissions</span>
            {newMessages > 0 && <span className="badge status-draft" style={{ marginLeft: 'auto', padding: '1px 6px', fontSize: '0.65rem' }}>{newMessages}</span>}
          </div>

          {hasPermission('manage_users') && (
            <div 
              className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}
            >
              <UsersIcon size={18} />
              <span>User Management</span>
            </div>
          )}

          <div 
            className={`sidebar-item ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => { setActiveTab('media'); setSidebarOpen(false); }}
          >
            <ImageIcon size={18} />
            <span>Media Manager</span>
          </div>

          {hasPermission('manage_settings') && (
            <div 
              className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
            >
              <SettingsIcon size={18} />
              <span>Website Settings</span>
            </div>
          )}

          <div 
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
          >
            <UserIcon size={18} />
            <span>Profile & Security</span>
          </div>
        </nav>

        <div className="sidebar-user">
          <img src={currentUser.profileImage} alt={currentUser.name} className="sidebar-user-avatar" />
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{currentUser.name}</div>
            <div className="sidebar-user-role">
              <Shield size={10} /> {currentUser.role}
            </div>
          </div>
          <LogOut size={18} className="sidebar-logout" onClick={handleLogout} title="Logout" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Header Block */}
        <header className="admin-header">
          <div className="header-title-wrap">
            <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
            <h1>
              {activeTab === 'analytics' && 'Dashboard Overview'}
              {(activeTab === 'blogs' || activeTab === 'create-blog' || activeTab === 'edit-blog') && 'Blog Management'}
              {activeTab === 'contacts' && 'Contact Submissions'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'media' && 'Media Manager'}
              {activeTab === 'settings' && 'Website Settings'}
              {activeTab === 'profile' && 'Profile & Security'}
            </h1>
          </div>

          <div className="header-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="header-nav-btn">
              <Globe size={14} /> View Site
            </a>

            {/* Notification Center */}
            <div className="notif-btn-wrap">
              <button className="notif-trigger" onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}>
                <Bell size={20} />
                {notifications.filter(n => !n.isRead).length > 0 && <span className="notif-badge" />}
              </button>

              {notifDropdownOpen && (
                <div className="notif-dropdown">
                  <div className="notif-header">
                    <h3>Notifications</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="notif-clear-btn" onClick={handleMarkNotifRead}>Mark read</button>
                      <button className="notif-clear-btn" style={{ color: 'var(--admin-danger)' }} onClick={handleClearNotif}>Clear</button>
                    </div>
                  </div>
                  <div className="notif-list">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className={`notif-item ${!n.isRead ? 'unread' : ''}`}>
                          <div className={`notif-icon-box ${n.type}`}>
                            {n.type === 'contact' && <Mail size={14} />}
                            {n.type === 'user' && <UsersIcon size={14} />}
                            {n.type === 'blog' && <BookOpen size={14} />}
                            {n.type === 'activity' && <Shield size={14} />}
                          </div>
                          <div className="notif-msg-wrap">
                            <div>{n.message}</div>
                            <span className="notif-time">{new Date(n.timestamp).toLocaleTimeString()} • {new Date(n.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notif-empty">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global Toast Alert */}
        {toast.message && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 10000,
            background: toast.type === 'error' ? 'var(--admin-danger)' : toast.type === 'info' ? 'var(--admin-info)' : 'var(--admin-success)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'modalSlideUp 0.3s ease-out'
          }}>
            <Info size={16} />
            <span>{toast.message}</span>
          </div>
        )}

        {/* Dynamic Panels */}
        <div className="admin-content" onClick={() => setNotifDropdownOpen(false)}>
          
          {/* --- TAB 1: OVERVIEW ANALYTICS --- */}
          {activeTab === 'analytics' && (
            <div>
              <div className="analytics-grid">
                <div className="analytic-card primary">
                  <div className="analytic-info">
                    <h4>Total Blogs</h4>
                    <span className="value">{totalBlogs}</span>
                  </div>
                  <div className="analytic-icon-box">
                    <BookOpen size={22} />
                  </div>
                </div>

                <div className="analytic-card success">
                  <div className="analytic-info">
                    <h4>Published Blogs</h4>
                    <span className="value">{publishedBlogs}</span>
                  </div>
                  <div className="analytic-icon-box" style={{ color: 'var(--admin-success)' }}>
                    <Check size={22} />
                  </div>
                </div>

                <div className="analytic-card warning">
                  <div className="analytic-info">
                    <h4>Drafts</h4>
                    <span className="value">{draftBlogs}</span>
                  </div>
                  <div className="analytic-icon-box" style={{ color: 'var(--admin-warning)' }}>
                    <Edit size={22} />
                  </div>
                </div>

                <div className="analytic-card info">
                  <div className="analytic-info">
                    <h4>Total Messages</h4>
                    <span className="value">{totalSubmissions}</span>
                  </div>
                  <div className="analytic-icon-box" style={{ color: 'var(--admin-info)' }}>
                    <Mail size={22} />
                  </div>
                </div>

                <div className="analytic-card success">
                  <div className="analytic-info">
                    <h4>Total Users</h4>
                    <span className="value">{totalUsersCount}</span>
                  </div>
                  <div className="analytic-icon-box" style={{ color: 'var(--admin-primary)' }}>
                    <UsersIcon size={22} />
                  </div>
                </div>

                <div className="analytic-card danger">
                  <div className="analytic-info">
                    <h4>New Messages</h4>
                    <span className="value">{newMessages}</span>
                  </div>
                  <div className="analytic-icon-box" style={{ color: 'var(--admin-danger)' }}>
                    <Bell size={22} />
                  </div>
                </div>
              </div>

              <div className="analytics-charts-grid">
                <div className="panel-card">
                  <div className="panel-header">
                    <span className="panel-title">Activity Statistics (Forms & Posts)</span>
                  </div>
                  {/* CSS SVG Bar Chart */}
                  <div className="chart-container">
                    <div className="chart-bar-wrap">
                      <div className="chart-bar" style={{ height: `${Math.min(100, Math.max(10, (publishedBlogs / 10) * 100))}%` }}>
                        <span className="chart-tooltip">Published Blogs: {publishedBlogs}</span>
                      </div>
                      <span className="chart-label">Published</span>
                    </div>

                    <div className="chart-bar-wrap">
                      <div className="chart-bar" style={{ height: `${Math.min(100, Math.max(10, (draftBlogs / 10) * 100))}%`, background: 'var(--admin-warning)' }}>
                        <span className="chart-tooltip">Drafts: {draftBlogs}</span>
                      </div>
                      <span className="chart-label">Drafts</span>
                    </div>

                    <div className="chart-bar-wrap">
                      <div className="chart-bar" style={{ height: `${Math.min(100, Math.max(10, (totalSubmissions / 20) * 100))}%`, background: 'var(--admin-info)' }}>
                        <span className="chart-tooltip">Submissions: {totalSubmissions}</span>
                      </div>
                      <span className="chart-label">Submissions</span>
                    </div>

                    <div className="chart-bar-wrap">
                      <div className="chart-bar" style={{ height: `${Math.min(100, Math.max(10, (newMessages / 10) * 100))}%`, background: 'var(--admin-danger)' }}>
                        <span className="chart-tooltip">New Messages: {newMessages}</span>
                      </div>
                      <span className="chart-label">Unread</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: '15px', textAlign: 'center' }}>
                    Activity summary representing relative counts of system items.
                  </p>
                </div>

                <div className="panel-card">
                  <div className="panel-header">
                    <span className="panel-title">Recent Activity Logs</span>
                  </div>
                  <div className="activity-list">
                    {activityLogs.slice(0, 5).map(log => (
                      <div key={log.id} className="activity-item">
                        <div className="activity-meta">
                          <span className="activity-user-badge">{log.user}</span>
                          <span className="activity-time">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="activity-details-wrap">
                          <span className="activity-action">{log.action}: </span>
                          <span className="activity-desc">{log.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB 2: BLOG MANAGEMENT --- */}
          {activeTab === 'blogs' && (
            <div>
              <div className="controls-bar">
                <div className="search-filter-wrap">
                  <div className="search-input-wrap">
                    <input 
                      type="text" 
                      placeholder="Search blogs by title..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="search-icon" size={16} />
                  </div>
                  
                  <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="action-btn secondary" onClick={() => setIsCategoryModalOpen(true)}>
                    Manage Categories
                  </button>
                  <button className="action-btn" onClick={openNewBlogModal}>
                    <Plus size={16} /> New Blog Post
                  </button>
                </div>
              </div>

              <div className="table-responsive-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Publish Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems(filteredBlogs).length > 0 ? (
                      paginatedItems(filteredBlogs).map(blog => (
                        <tr key={blog.id}>
                          <td style={{ fontWeight: 600, color: 'var(--admin-text)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</td>
                          <td>{blog.category}</td>
                          <td>{blog.author}</td>
                          <td>
                            <span className={`badge status-${blog.status.toLowerCase()}`}>{blog.status}</span>
                          </td>
                          <td>{new Date(blog.publishDate || Date.now()).toLocaleDateString()}</td>
                          <td>
                            <div className="table-actions">
                              <button className="icon-btn edit" onClick={() => openEditBlogModal(blog)} title="Edit Blog">
                                <Edit size={16} />
                              </button>
                              <button className="icon-btn delete" onClick={() => handleDeleteBlog(blog.id)} title="Delete Blog">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                          No blogs found matching the filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredBlogs.length > itemsPerPage && (
                <div className="pagination-container">
                  <span className="pagination-text">Showing {(currentPage-1)*itemsPerPage+1} - {Math.min(currentPage*itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} posts</span>
                  <div className="pagination-buttons">
                    <button className="header-nav-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                      <ChevronLeft size={16} />
                    </button>
                    <button className="header-nav-btn" disabled={currentPage === totalPages(filteredBlogs)} onClick={() => setCurrentPage(prev => prev + 1)}>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- SUB-TAB: CREATE/EDIT BLOG ARTICLE --- */}
          {(activeTab === 'create-blog' || activeTab === 'edit-blog') && (
            <div className="panel-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="panel-header" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '15px', marginBottom: '20px' }}>
                <h3 className="panel-title">{editingBlog ? 'Edit Blog Article' : 'Create New Blog Post'}</h3>
                <button type="button" className="action-btn secondary" onClick={() => setActiveTab('blogs')}>
                  <X size={16} /> Back to List
                </button>
              </div>
              
              <form onSubmit={handleBlogFormSubmit}>
                <div className="modal-body" style={{ padding: 0 }}>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Article Title</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        placeholder="Transforming Urban Waste"
                        value={blogFormData.title}
                        onChange={(e) => handleBlogTitleChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">URL Slug</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        placeholder="transforming-urban-waste"
                        value={blogFormData.slug}
                        onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Category</label>
                      <select 
                        className="admin-form-select"
                        value={blogFormData.category}
                        onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Author Selection</label>
                      <select 
                        className="admin-form-select"
                        value={blogFormData.author || currentUser.name}
                        onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                      >
                        {users.map(u => (
                          <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Featured Image URL</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          className="admin-form-input" 
                          placeholder="https://images.unsplash.com/... or upload"
                          value={blogFormData.image}
                          onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                        />
                        <button type="button" className="header-nav-btn" onClick={() => openMediaSelector('image')}>
                          Browse
                        </button>
                        <button 
                          type="button" 
                          className="header-nav-btn" 
                          onClick={() => document.getElementById('blog-featured-image-file').click()}
                        >
                          Upload
                        </button>
                        <input 
                          type="file" 
                          id="blog-featured-image-file" 
                          accept="image/*" 
                          style={{ display: 'none' }} 
                          onChange={handleBlogFeaturedImageUpload}
                        />
                      </div>
                      {blogFormData.image && blogFormData.image.startsWith('data:') && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--admin-success)', marginTop: '4px', display: 'block' }}>
                          ✓ Image loaded from device upload
                        </span>
                      )}
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Gallery Images ({blogFormData.gallery ? blogFormData.gallery.length : 0} selected)</label>
                      <button type="button" className="header-nav-btn" style={{ width: '100%' }} onClick={() => openMediaSelector('gallery')}>
                        Manage Post Gallery
                      </button>
                    </div>
                  </div>

                  {/* WYSIWYG Mock Editor */}
                  <div className="admin-form-group">
                    <label className="admin-form-label">Content Body (HTML Supported)</label>
                    <div className="wysiwyg-wrapper">
                      <div className="wysiwyg-toolbar">
                        <button type="button" className="wysiwyg-tool-btn" onClick={() => setBlogFormData(prev => ({ ...prev, content: prev.content + '<h2>Subheading</h2>\n' }))}>H2</button>
                        <button type="button" className="wysiwyg-tool-btn" onClick={() => setBlogFormData(prev => ({ ...prev, content: prev.content + '<strong>Bold Text</strong>' }))}>B</button>
                        <button type="button" className="wysiwyg-tool-btn" onClick={() => setBlogFormData(prev => ({ ...prev, content: prev.content + '<em>Italic Text</em>' }))}>I</button>
                        <button type="button" className="wysiwyg-tool-btn" onClick={() => setBlogFormData(prev => ({ ...prev, content: prev.content + '<blockquote class="quote">"Quote text"</blockquote>\n' }))}>Blockquote</button>
                        <button type="button" className="wysiwyg-tool-btn" onClick={() => setBlogFormData(prev => ({ ...prev, content: prev.content + '<a href="#">Link</a>' }))}>Link</button>
                      </div>
                      <textarea 
                        className="admin-form-textarea" 
                        style={{ border: 'none', background: 'transparent', margin: 0, padding: '15px', borderRadius: 0, minHeight: '200px' }}
                        placeholder="<p>Write your detailed blog post body here...</p>"
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Tags (comma-separated)</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        placeholder="Recycling, Community, 3Rs"
                        value={blogFormData.tags}
                        onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Status</label>
                      <select 
                        className="admin-form-select"
                        value={blogFormData.status}
                        onChange={(e) => setBlogFormData({ ...blogFormData, status: e.target.value })}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">SEO Meta Title</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        value={blogFormData.seoTitle}
                        onChange={(e) => setBlogFormData({ ...blogFormData, seoTitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">SEO Meta Description</label>
                    <textarea 
                      className="admin-form-textarea" 
                      style={{ minHeight: '60px' }}
                      value={blogFormData.seoDescription}
                      onChange={(e) => setBlogFormData({ ...blogFormData, seoDescription: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '20px', marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingBottom: 0 }}>
                  <button type="button" className="action-btn secondary" onClick={() => setActiveTab('blogs')}>Cancel</button>
                  <button type="submit" className="action-btn">Save Post</button>
                </div>
              </form>
            </div>
          )}

          {/* --- TAB 3: CONTACT SUBMISSIONS --- */}
          {activeTab === 'contacts' && (
            <div>
              <div className="controls-bar">
                <div className="search-filter-wrap">
                  <div className="search-input-wrap">
                    <input 
                      type="text" 
                      placeholder="Search submissions by sender, subject, message..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="search-icon" size={16} />
                  </div>
                  
                  <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Messages</option>
                    <option value="Unread">Unread Only</option>
                    <option value="Read">Read Only</option>
                    <option value="Replied">Replied Only</option>
                    <option value="Unreplied">Unreplied Only</option>
                  </select>
                </div>

                <button className="action-btn secondary" onClick={handleExportContactsCSV}>
                  <Download size={16} /> Export CSV
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Replied</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems(filteredContacts).length > 0 ? (
                      paginatedItems(filteredContacts).map(contact => (
                        <tr key={contact.id} style={{ opacity: contact.isRead ? 0.75 : 1 }}>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{contact.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{contact.email}</div>
                          </td>
                          <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.subject}</td>
                          <td>{new Date(contact.date).toLocaleString()}</td>
                          <td>
                            <span className={`badge status-${contact.isRead ? 'read' : 'unread'}`}>{contact.isRead ? 'Read' : 'Unread'}</span>
                          </td>
                          <td>
                            <span className={`badge status-${contact.replyStatus.toLowerCase()}`}>{contact.replyStatus}</span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button className="icon-btn view" onClick={() => handleViewContact(contact)} title="View Submission Details">
                                <Eye size={16} />
                              </button>
                              <button className="icon-btn edit" onClick={() => handleToggleReadContact(contact.id, contact.isRead)} title={contact.isRead ? "Mark Unread" : "Mark Read"}>
                                <Check size={16} />
                              </button>
                              <button className="icon-btn delete" onClick={() => handleDeleteContact(contact.id)} title="Delete Submission">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                          No submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredContacts.length > itemsPerPage && (
                <div className="pagination-container">
                  <span className="pagination-text">Showing {(currentPage-1)*itemsPerPage+1} - {Math.min(currentPage*itemsPerPage, filteredContacts.length)} of {filteredContacts.length} submissions</span>
                  <div className="pagination-buttons">
                    <button className="header-nav-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                      <ChevronLeft size={16} />
                    </button>
                    <button className="header-nav-btn" disabled={currentPage === totalPages(filteredContacts)} onClick={() => setCurrentPage(prev => prev + 1)}>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- TAB 4: USER MANAGEMENT --- */}
          {activeTab === 'users' && hasPermission('manage_users') && (
            <div>
              <div className="controls-bar">
                <div className="search-filter-wrap">
                  <div className="search-input-wrap">
                    <input 
                      type="text" 
                      placeholder="Search users by name, email..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="search-icon" size={16} />
                  </div>
                </div>

                <button className="action-btn" onClick={openNewUserModal}>
                  <Plus size={16} /> Add New User
                </button>
              </div>

              <div className="table-responsive-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <tr key={user.id}>
                          <td>
                            <img src={user.profileImage} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                          </td>
                          <td style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge role-${user.role.toLowerCase().replace(' ', '-')}`}>{user.role}</span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button className="icon-btn edit" onClick={() => openEditUserModal(user)} title="Edit User">
                                <Edit size={16} />
                              </button>
                              <button className="icon-btn delete" onClick={() => handleDeleteUser(user.id)} title="Delete User">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                          No users found matching search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB 5: MEDIA MANAGER --- */}
          {activeTab === 'media' && (
            <div>
              <div className="panel-card" style={{ marginBottom: '30px' }}>
                <span className="panel-title" style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Upload size={18} /> Upload Media File
                </span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginTop: '10px' }}>
                  {/* Left Column: Device File Upload */}
                  <div style={{ 
                    border: '2px dashed var(--admin-border, rgba(59, 184, 82, 0.25))', 
                    borderRadius: '12px', 
                    padding: '25px', 
                    textAlign: 'center',
                    background: 'rgba(59, 184, 82, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    minHeight: '160px'
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const fakeEvent = { target: { files: e.dataTransfer.files } };
                      handleFileChange(fakeEvent);
                    }
                  }}
                  onClick={() => document.getElementById('device-file-input').click()}
                  >
                    <input 
                      type="file" 
                      id="device-file-input" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={handleFileChange}
                    />
                    
                    {uploadFileDataUrl ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src={uploadFileDataUrl} 
                          alt="Preview" 
                          style={{ maxHeight: '100px', maxWidth: '100%', borderRadius: '8px', objectFit: 'contain', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} 
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', wordBreak: 'break-all' }}>
                          Selected: {mockMediaName}.jpg ({Math.round(uploadFileSize / 1024)} KB)
                        </span>
                        <button 
                          type="button" 
                          style={{
                            position: 'absolute',
                            top: '-15px',
                            right: '-10px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadFileDataUrl('');
                            setUploadFileSize(0);
                            setUploadFileType('');
                            setMockMediaName('');
                            document.getElementById('device-file-input').value = '';
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} style={{ color: 'var(--admin-primary, #3BB852)', marginBottom: '10px', opacity: 0.8 }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--admin-text, #f0f7f4)' }}>Choose a file or drag it here</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '4px' }}>PNG, JPG, WebP up to 10MB</span>
                      </>
                    )}
                  </div>

                  {/* Right Column: Web URL & Name Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Or paste Image Web URL</label>
                      <input 
                        type="url" 
                        className="admin-form-input" 
                        placeholder="https://images.unsplash.com/photo-..." 
                        value={mockMediaUrl}
                        onChange={(e) => {
                          setMockMediaUrl(e.target.value);
                          if (uploadFileDataUrl) {
                            setUploadFileDataUrl('');
                            setUploadFileSize(0);
                            setUploadFileType('');
                            setMockMediaName('');
                          }
                        }}
                      />
                    </div>
                    
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Media Title / File Name</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        placeholder="e.g. lake_cleanup" 
                        value={mockMediaName}
                        onChange={(e) => setMockMediaName(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        type="button" 
                        className="action-btn secondary" 
                        style={{ flex: 1, height: '42px' }}
                        onClick={() => {
                          setMockMediaUrl('');
                          setMockMediaName('');
                          setUploadFileDataUrl('');
                          setUploadFileSize(0);
                          setUploadFileType('');
                          const fileInput = document.getElementById('device-file-input');
                          if (fileInput) fileInput.value = '';
                        }}
                      >
                        Clear
                      </button>
                      
                      <button 
                        type="button" 
                        className="action-btn" 
                        style={{ flex: 2, height: '42px' }}
                        onClick={handleMockUpload}
                      >
                        Upload Media
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="controls-bar">
                <div className="search-filter-wrap">
                  <div className="search-input-wrap">
                    <input 
                      type="text" 
                      placeholder="Search files..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="search-icon" size={16} />
                  </div>
                </div>
              </div>

              <div className="media-grid">
                {filteredMedia.map(item => (
                  <div key={item.id} className="media-card">
                    <div className="media-preview-wrap">
                      <img src={item.url} alt={item.name} />
                    </div>
                    <div className="media-details">
                      <div className="media-name" title={item.name}>{item.name}</div>
                      <div className="media-meta">{Math.round(item.size / 1024)} KB</div>
                      <div className="media-actions">
                        <button className="icon-btn" onClick={() => handleCopyUrl(item.url)} title="Copy Image URL">
                          <Copy size={14} />
                        </button>
                        <button className="icon-btn delete" onClick={() => handleDeleteMedia(item.id)} title="Delete Media">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TAB 6: WEBSITE SETTINGS --- */}
          {activeTab === 'settings' && hasPermission('manage_settings') && (
            <div className="panel-card" style={{ maxWidth: '800px' }}>
              <form onSubmit={handleSaveSettings}>
                <div className="settings-section-card">
                  <h3 className="settings-section-title">
                    <Globe size={18} /> Global Configurations
                  </h3>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Website Name</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      value={settings.websiteName || ''}
                      onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Logo Path / URL</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        value={settings.logoUrl || ''}
                        onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Favicon Path / URL</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        value={settings.faviconUrl || ''}
                        onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-section-card">
                  <h3 className="settings-section-title">
                    <Search size={18} /> SEO Management
                  </h3>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Meta Global Title</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      value={settings.seoTitle || ''}
                      onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Meta Global Description</label>
                    <textarea 
                      className="admin-form-textarea" 
                      value={settings.seoDescription || ''}
                      onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Keywords (comma-separated)</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      value={settings.seoKeywords || ''}
                      onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Open Graph Social Share Image URL</label>
                    <input 
                      type="url" 
                      className="admin-form-input" 
                      value={settings.ogImageUrl || ''}
                      onChange={(e) => setSettings({ ...settings, ogImageUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="settings-section-card">
                  <h3 className="settings-section-title">
                    <Lock size={18} /> Advanced & Robots
                  </h3>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Robots.txt Content</label>
                    <textarea 
                      className="admin-form-textarea" 
                      style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                      value={settings.robotsTxt || ''}
                      onChange={(e) => setSettings({ ...settings, robotsTxt: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Sitemap.xml URL Location</label>
                    <input 
                      type="url" 
                      className="admin-form-input" 
                      value={settings.sitemapUrl || ''}
                      onChange={(e) => setSettings({ ...settings, sitemapUrl: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="action-btn">
                  Save Settings & Update SEO
                </button>
              </form>
            </div>
          )}

          {/* --- TAB 7: PROFILE & SECURITY (2FA) --- */}
          {activeTab === 'profile' && (
            <div className="panel-card" style={{ maxWidth: '800px' }}>
              <form onSubmit={handleSaveProfile}>
                <div className="profile-wrap">
                  <div className="profile-avatar-zone">
                    <img src={profileImage} alt={profileName} className="profile-avatar-large" />
                    <div className="admin-form-group" style={{ marginTop: '10px' }}>
                      <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Avatar Image URL</label>
                      <input 
                        type="url" 
                        className="admin-form-input" 
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        placeholder="https://image-url"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="settings-section-title" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px' }}>
                      <UserIcon size={18} /> Profile Specifications
                    </h3>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="admin-form-input" 
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Bio Description</label>
                      <textarea 
                        className="admin-form-textarea" 
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Change Password</label>
                      <input 
                        type="password" 
                        className="admin-form-input" 
                        value={profilePassword}
                        onChange={(e) => setProfilePassword(e.target.value)}
                        placeholder="Enter secure password"
                        required
                      />
                    </div>

                    <h3 className="settings-section-title" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px', marginTop: '30px' }}>
                      <Lock size={18} /> Security & Two-Factor Authentication
                    </h3>

                    <div className="toggle-switch-wrap">
                      <div className="toggle-switch-info">
                        <h4>Enable Two-Factor Authentication (2FA)</h4>
                        <p>Protect your admin session with standard secondary security token codes.</p>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={twoFactor}
                          onChange={(e) => setTwoFactor(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    {twoFactor && (
                      <div style={{
                        background: 'rgba(245, 158, 11, 0.05)',
                        border: '1px dashed rgba(245, 158, 11, 0.3)',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '20px',
                        fontSize: '0.8rem',
                        lineHeight: '1.4'
                      }}>
                        <div style={{ display: 'flex', gap: '8px', color: 'var(--admin-warning)', fontWeight: '600', marginBottom: '5px' }}>
                          <AlertTriangle size={16} /> 2FA Setup Information
                        </div>
                        <p style={{ margin: 0, color: 'var(--admin-text-muted)' }}>
                          Scan the setup string below in your Google Authenticator or Microsoft Authenticator app. 
                          During login, verify using your authenticator code or use standard mock bypass code: <code>123456</code>.
                        </p>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span>Secret Key:</span>
                          <code style={{ background: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: '4px', color: 'white' }}>
                            UBOONTU-ADMIN-SECRET-KEY-2026
                          </code>
                        </div>
                      </div>
                    )}

                    <button type="submit" className="action-btn">
                      Save Account Security Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* --- MODAL 2: CONTACT VIEW SUBMISSION DETAILS --- */}
      {isContactModalOpen && viewingContact && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Submission Detail Inbox</h3>
              <button className="modal-close" onClick={() => setIsContactModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '15px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Sender Profile</span>
                <h4 style={{ fontSize: '1.2rem', margin: '4px 0', color: 'white' }}>{viewingContact.name}</h4>
                <p style={{ margin: '2px 0', fontSize: '0.9rem' }}>Email: <a href={`mailto:${viewingContact.email}`} style={{ color: 'var(--admin-primary)' }}>{viewingContact.email}</a></p>
                {viewingContact.phone && <p style={{ margin: '2px 0', fontSize: '0.9rem' }}>Phone: {viewingContact.phone}</p>}
                <p style={{ margin: '2px 0', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Submitted: {new Date(viewingContact.date).toLocaleString()}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Subject</span>
                <h4 style={{ margin: '4px 0 15px 0', color: 'white' }}>{viewingContact.subject}</h4>

                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Message Content</span>
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '8px',
                  padding: '15px',
                  color: 'white',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  whiteSpace: 'pre-wrap',
                  marginTop: '6px'
                }}>
                  {viewingContact.message}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>Reply Status:</span>
                <span className={`badge status-${viewingContact.replyStatus.toLowerCase()}`}>{viewingContact.replyStatus}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="action-btn secondary" onClick={() => setIsContactModalOpen(false)}>Close</button>
              {viewingContact.replyStatus !== 'Replied' && (
                <button type="button" className="action-btn" onClick={() => handleReplyContact(viewingContact.id)}>Mark Replied / Simulated Reply</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: USER ADD / EDIT FORM --- */}
      {isUserModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{editingUser ? 'Edit User Credentials' : 'Add New Account'}</h3>
              <button className="modal-close" onClick={() => setIsUserModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleUserFormSubmit}>
              <div className="modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="admin-form-input" 
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="admin-form-input" 
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Password</label>
                  <input 
                    type="password" 
                    className="admin-form-input" 
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Role</label>
                  <select 
                    className="admin-form-select"
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Avatar Image URL</label>
                  <input 
                    type="url" 
                    className="admin-form-input" 
                    placeholder="https://images.unsplash.com/photo-..."
                    value={userFormData.profileImage}
                    onChange={(e) => setUserFormData({ ...userFormData, profileImage: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="action-btn secondary" onClick={() => setIsUserModalOpen(false)}>Cancel</button>
                <button type="submit" className="action-btn">Save Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- AUXILIARY MODAL: MEDIA FILE SELECTOR --- */}
      {isMediaSelectorOpen && (
        <div className="modal-overlay" style={{ zIndex: 11000 }}>
          <div className="modal-card large">
            <div className="modal-header">
              <h3>
                {mediaSelectorTarget === 'image' ? 'Select Featured Image' : 'Select Gallery Images'}
              </h3>
              <button className="modal-close" onClick={() => setIsMediaSelectorOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '15px' }}>
                {mediaSelectorTarget === 'image' 
                  ? 'Click on any image below to select it as the featured image for this blog post.' 
                  : 'Select multiple images below to include in the gallery section of this article.'}
              </p>

              <div className="media-manager-grid">
                {media.length > 0 ? (
                  media.map(item => {
                    const isSelected = mediaSelectorTarget === 'gallery' && selectedGalleryImages.includes(item.url);
                    return (
                      <div 
                        key={item.id} 
                        className={`media-select-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (mediaSelectorTarget === 'image') {
                            selectMediaForFeatured(item.url);
                          } else {
                            toggleSelectMediaForGallery(item.url);
                          }
                        }}
                      >
                        <img src={item.url} alt={item.name} />
                        {isSelected && <div className="media-select-card-badge"><Check size={12} /></div>}
                      </div>
                    );
                  })
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '30px', color: 'var(--admin-text-muted)' }}>
                    No media items upload in Media Manager yet.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="action-btn secondary" onClick={() => setIsMediaSelectorOpen(false)}>Cancel</button>
              {mediaSelectorTarget === 'gallery' && (
                <button type="button" className="action-btn" onClick={confirmGallerySelection}>Confirm Selection</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CATEGORY MANAGEMENT --- */}
      {isCategoryModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 11000 }}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Manage Blog Categories</h3>
              <button className="modal-close" onClick={() => setIsCategoryModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {/* Add New Category */}
              <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input 
                  type="text" 
                  className="admin-form-input" 
                  placeholder="New Category Name (e.g. E-Waste)"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
                <button type="submit" className="action-btn" style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={16} /> Add
                </button>
              </form>

              {/* Categories List */}
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {categories.length > 0 ? (
                  categories.map(cat => (
                    <div 
                      key={cat} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '10px 12px', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid var(--admin-border)',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    >
                      <span style={{ fontWeight: 500, color: 'var(--admin-text)' }}>{cat}</span>
                      <button 
                        type="button" 
                        className="icon-btn delete" 
                        onClick={() => handleDeleteCategory(cat)}
                        title="Delete Category"
                        style={{ padding: '6px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: '20px' }}>
                    No categories found. Add one above.
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="action-btn secondary" onClick={() => setIsCategoryModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
