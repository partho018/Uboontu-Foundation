'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  }
};

export default function BlogContainer() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Latest Blogs');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categoriesList, setCategoriesList] = useState(['Latest Blogs']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch('/api/blogs?status=Published', { cache: 'no-store' });
        const json = await res.json();
        if (json.ok && json.data) {
          const visible = json.data;
          setPosts(visible);
          
          // Generate unique categories dynamically
          const cats = ['Latest Blogs', ...new Set(visible.map(p => p.category).filter(Boolean))];
          setCategoriesList(cats);
        }
      } catch (e) {
        console.error('Failed to load blogs:', e);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchCat = activeCategory === 'Latest Blogs' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          (p.excerpt || '').toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, search]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="blogs-page">
      {/* ─── HERO SECTION ─── */}
      <section className="blogs-hero">
        <div className="blogs-hero-bg" style={{ backgroundImage: `url('/blog-hero-bg.webp')` }} />
        <div className="blogs-hero-inner">
          <Link href="/" className="blogs-brand-link">
            <span className="blogs-brand">Uboontu</span>
          </Link>
          <nav className="blogs-breadcrumb" aria-label="breadcrumb">
            <Link href="/" className="blogs-bc-link">Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="blogs-bc-current">Blogs</span>
          </nav>
          <h1 className="blogs-hero-title">
            Your Go-To Source:
            <br />
            <em>Blog Highlights &amp; More</em>
          </h1>
          <div className="blogs-search-wrap">
            <svg className="blogs-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="blogs-search-input"
              type="text"
              placeholder="Search any blog"
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ─── BLOG LISTING SECTION ─── */}
      <section className="blogs-listing">
        {/* Category Filter Tabs */}
        <div className="blogs-cats-wrap">
          <div className="blogs-cats">
            {categoriesList.map(cat => (
              <button
                key={cat}
                className={`blogs-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Grid / Empty state */}
        {loading ? (
          <div className="blogs-loading" style={{ textAlign: 'center', padding: '60px', color: '#333', fontSize: '18px' }}>
            <div className="loading-spinner" style={{ border: '4px solid rgba(0,0,0,0.1)', borderLeft: '4px solid #682EE6', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p>Loading blogs...</p>
          </div>
        ) : paginatedPosts.length > 0 ? (
          <>
            <motion.div 
              className="blogs-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {paginatedPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="blogs-card-wrapper" style={{ textDecoration: 'none' }}>
                  <motion.article className="blogs-card" variants={itemVariants}>
                    {/* Card Image / Graphic */}
                    <div className="blogs-card-thumb">
                      <div 
                        className="blogs-card-img" 
                        style={{ 
                          backgroundImage: `url(${post.image || '/image (1).webp'})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center' 
                        }} 
                      />
                    </div>

                    {/* Card Body */}
                    <div className="blogs-card-body">
                      <h3 className="blogs-card-title">{post.title}</h3>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="blogs-pagination">
                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === '...') {
                    return (
                      <span key={`dots-${idx}`} className="blogs-page-dots">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={`page-${pageNum}`}
                      className={`blogs-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  className="blogs-page-next-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  aria-label="Next Page"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="blogs-empty">
            <span>🔍</span>
            <p>No posts found for &quot;<strong>{search}</strong>&quot;</p>
          </div>
        )}
      </section>
    </div>
  );
}
