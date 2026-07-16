'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TableOfContents from './TableOfContents';

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Simple Helper to Parse Inline Markdown (bold, italic, code)
function formatInlineMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

// Simple Markdown Block Parser
function renderMarkdown(content) {
    if (!content) return null;

    const blocks = content.split(/\n\n+/);
    return blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headers
        if (trimmed.startsWith('### ')) {
            const text = trimmed.substring(4);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return <h3 key={index} id={id}>{text}</h3>;
        }
        if (trimmed.startsWith('## ')) {
            const text = trimmed.substring(3);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return <h2 key={index} id={id}>{text}</h2>;
        }
        if (trimmed.startsWith('# ')) {
            const text = trimmed.substring(2);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return <h1 key={index} id={id}>{text}</h1>;
        }

        // Unordered List
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const items = trimmed.split(/\n[-*]\s+/).map(item => item.replace(/^[-*]\s+/, ''));
            return (
                <ul key={index}>
                    {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
                    ))}
                </ul>
            );
        }

        // Paragraph
        return (
            <p 
                key={index} 
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} 
            />
        );
    });
}

// Helper to extract headings for the TOC card
function extractHeadings(content) {
    if (!content) return [];

    const lines = content.split('\n');
    const headings = [{ id: 'introduction', label: 'Introduction' }];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ')) {
            const text = trimmed.substring(3);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            headings.push({ id, label: text });
        } else if (trimmed.startsWith('### ')) {
            const text = trimmed.substring(4);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            headings.push({ id, label: text });
        }
    });

    if (!headings.some(h => h.id === 'conclusion')) {
        headings.push({ id: 'conclusion', label: 'Conclusion' });
    }

    return headings;
}

export default function SingleBlogContainer({ slug }) {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`, { cache: 'no-store' });
        const json = await res.json();
        if (!json.ok || !json.data) { setLoading(false); return; }
        setPost(json.data);

        // Fetch related blogs
        const allRes = await fetch('/api/blogs?status=Published', { cache: 'no-store' });
        const allJson = await allRes.json();
        if (allJson.ok) {
          const now = new Date();
          const related = allJson.data
            .filter(p => p.slug !== slug)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (e) {
        console.error('Failed to load blog:', e);
      }
      setLoading(false);
    }
    loadBlog();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="blogs-page" style={{ padding: '150px 20px', textAlign: 'center', color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner" style={{ border: '4px solid var(--border-color)', borderLeft: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Loading article details...</h2>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  return (
    <div className="blogs-page">
      {/* ─── HERO HEADER SECTION (80vh height, background image) ─── */}
      <section 
        className="single-blog-hero" 
        style={{ backgroundImage: `url('/blog-hero-bg.webp')` }}
      >
        <div className="single-blog-hero-overlay" />
        <div className="single-blog-hero-inner">
          <div className="blogs-brand-link">
            <h1 className="blogs-brand">Uboontu</h1>
          </div>
          <div className="single-blog-breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link href="/blog">Blogs</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Blog details</span>
          </div>

          <h1 className="single-blog-title">
            {post.title ? (() => {
              const words = post.title.trim().split(' ');
              if (words.length <= 1) return post.title;
              const lastWord = words.pop();
              return (
                <>
                  {words.join(' ')} <span className="elegant-serif">{lastWord}</span>
                </>
              );
            })() : ''}
          </h1>

          <div className="single-blog-meta-container">
            <div className="single-blog-meta-item">
              <span className="single-blog-meta-label">Author</span>
              <span className="single-blog-meta-value">{post.author || 'Uboontu Team'}</span>
            </div>
            <div className="single-blog-meta-item">
              <span className="single-blog-meta-label">Publish Date</span>
              <span className="single-blog-meta-value">{post.date || post.publishDate || 'Recent'}</span>
            </div>
            <div className="single-blog-meta-item">
              <span className="single-blog-meta-label">Category</span>
              <span className="single-blog-meta-value">{post.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED IMAGE ─── */}
      {post.image && (
        <div className="single-blog-featured-wrap">
          <img 
            src={post.image} 
            alt={post.title} 
            className="single-blog-featured-img" 
          />
        </div>
      )}

      {/* ─── BLOG CONTENT GRID SECTION ─── */}
      <article className="single-blog-content-body">
        <div className="single-blog-grid-layout">
          {/* Left Sidebar (Sticky Table of Contents) */}
          <aside className="single-blog-left-sidebar">
            <TableOfContents headings={headings} />
          </aside>

          {/* Middle Content (Scrolling Body) */}
          <main className="single-blog-main-content">
            {/* Key Takeaways Box */}
            <div className="single-blog-takeaways-box">
              <h3 className="single-blog-takeaways-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="takeaways-sparkle-icon">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="var(--accent)"/>
                </svg>
                Key Takeaways
              </h3>
              <ul className="single-blog-takeaways-list">
                <li>Collaboration makes community waste programs sustainable.</li>
                <li>Strategic planning ensures maximum recycling efficiency.</li>
                <li>Educating youth is key to creating a greener future.</li>
                <li>Local partnerships amplify circular economy benefits.</li>
                <li>Clear accountability ensures long-term impact metrics.</li>
              </ul>
            </div>

            <p id="introduction" className="single-blog-lead-text">
              {post.excerpt}
            </p>

            <div className="markdown-content">
              {renderMarkdown(post.content)}
            </div>

            <div id="conclusion" style={{ height: '1px' }} />
          </main>

          {/* Right Sidebar (Sticky CTA Card) */}
          <aside className="single-blog-right-sidebar">
            <div className="single-blog-cta-card">
              <div className="single-blog-cta-banner">
                <img src="/6734f70094aa7b62e8c08b04_UI Photo.avif" alt="Waste Management" className="single-blog-cta-img" />
              </div>
              <div className="single-blog-cta-content">
                <span className="single-blog-cta-badge">Uboontu Impact</span>
                <h4 className="single-blog-cta-title">Support a cleaner, <br /> greener <em>Community</em></h4>
                <ul className="single-blog-cta-bullets">
                  <li>
                    <svg className="single-blog-cta-check" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="var(--primary)" strokeWidth="2.5" fill="none" />
                      <path d="M8.5 12.5L11 15L16 9" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Community-led recycling
                  </li>
                  <li>
                    <svg className="single-blog-cta-check" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="var(--primary)" strokeWidth="2.5" fill="none" />
                      <path d="M8.5 12.5L11 15L16 9" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Empowering local waste workers
                  </li>
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-donate'))}
                    className="single-blog-cta-button"
                    style={{ width: '100%', border: 'none', cursor: 'pointer' }}
                  >
                    Donate to Cause
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    onClick={handleCopyLink}
                    className="single-blog-cta-button"
                    style={{ width: '100%', border: '1px solid var(--primary)', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}
                  >
                    {copied ? 'Link Copied!' : 'Share Article'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* ─── SEE OTHER BLOGS SECTION ─── */}
      {relatedPosts.length > 0 && (
        <section className="single-blog-related-section">
          <div className="single-blog-related-container">
            <div className="single-blog-related-header">
              <span className="single-blog-related-badge">More Blogs</span>
              <h2 className="single-blog-related-title">See other <em>Blogs</em></h2>
            </div>

            <div className="single-blog-related-grid">
              {relatedPosts.map((rPost) => (
                <div className="single-blog-related-card" key={rPost.id}>
                  <Link href={`/blog/${rPost.slug}`} className="single-blog-related-card-link">
                    <div className="single-blog-related-img-wrap">
                      <img src={rPost.image || '/image (1).webp'} alt={rPost.title} />
                    </div>
                    <h3 className="single-blog-related-card-title">{rPost.title}</h3>
                  </Link>
                </div>
              ))}
            </div>

            <div className="single-blog-related-footer">
              <Link href="/blog" className="single-blog-view-more-btn">
                View More Blogs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
