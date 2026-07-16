'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/app/Uboontu-Foundation-logo.png';
import {
  Menu,
  X,
  Sun,
  Moon,
  Leaf,
  Heart,
  ChevronDown,
  Building2,
  HandHeart,
  Users,
  Award,
  Briefcase,
  Trash2,
  Building,
  GraduationCap,
  RefreshCw,
  Globe,
  Home as HomeIcon,
  Info,
  FileText,
  Mail
} from 'lucide-react';

export default function Header({ onDonateClick, onPartnerClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: HomeIcon },
    { label: 'About Us', href: '/about', icon: Info },
    { label: 'Our Work', href: '/our-work', icon: Leaf },
    { label: 'Blog & News', href: '/blog', icon: FileText },
    {
      label: 'Get Involved',
      href: '#',
      isNonClickable: true,
      icon: HandHeart,
      submenu: [
        { label: 'Partner', href: '/get-involved/partner', icon: Building2 },
        { label: 'Donate', href: '/get-involved/donate', icon: Heart },
        { label: 'Volunteer', href: '/get-involved/volunteer', icon: Users },
        { label: 'Internship', href: '/get-involved/internship', icon: Award },
        { label: 'Join with us', href: '/get-involved/careers', icon: Briefcase },
      ]
    },
    { label: 'Contact Us', href: '/contact', icon: Mail },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '#') return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link href="/" className="logo">
            <Image
              src={logoImg}
              alt="Uboontu Foundation"
              className="logo-image"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const hasSub = !!link.submenu;
              const active = isActive(link.href);
              return (
                <div
                  key={link.label}
                  className={`nav-item-wrapper ${hasSub ? 'has-submenu' : ''}`}
                >
                  {link.isNonClickable ? (
                    <span className={`nav-link non-clickable ${active ? 'active' : ''}`}>
                      <span>{link.label}</span>
                      {hasSub && <ChevronDown size={14} className="submenu-arrow-icon" />}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className={`nav-link ${active ? 'active' : ''}`}
                    >
                      <span>{link.label}</span>
                      {hasSub && <ChevronDown size={14} className="submenu-arrow-icon" />}
                    </Link>
                  )}
                  {hasSub && (
                    <div className="submenu-dropdown">
                      {link.submenu.map((sublink) => {
                        const SubIcon = sublink.icon;
                        return (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            className="submenu-link"
                          >
                            {SubIcon && (
                              <span className="sublink-icon-wrap">
                                <SubIcon size={18} />
                              </span>
                            )}
                            <div className="sublink-text-wrap">
                              <span className="sublink-title">{sublink.label}</span>
                              {sublink.desc && <span className="sublink-desc">{sublink.desc}</span>}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="actions">
            <Link href="/get-involved/donate" className="btn-action donate-btn">
              <Heart size={16} fill="currentColor" style={{ flexShrink: 0 }} /> <span>Donate</span>
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Glow Decor Blobs */}
        <div className="drawer-bg-blob" />
        <div className="drawer-bg-blob-2" />

        <div className="mobile-drawer-header">
          <Link href="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src={logoImg}
              alt="Uboontu Foundation"
              className="logo-image"
              priority
            />
          </Link>
          <div className="mobile-drawer-actions">
            <button
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <nav className="mobile-nav">
          <div className="mobile-nav-links-wrapper">
            {navLinks.map((link) => {
              const hasSub = !!link.submenu;
              const LinkIcon = link.icon;
              const active = isActive(link.href);
              const isSubExpanded = expandedSubmenu === link.label;
              return (
                <div key={link.label} className="mobile-nav-item-wrap">
                  <div className="mobile-nav-row">
                    {link.isNonClickable ? (
                      <span
                        className={`mobile-nav-link non-clickable ${active ? 'active' : ''}`}
                        onClick={() => setExpandedSubmenu(isSubExpanded ? null : link.label)}
                        style={{ cursor: 'pointer', display: 'flex', width: '100%', alignItems: 'center', gap: '0.85rem' }}
                      >
                        {LinkIcon && <LinkIcon size={18} className="mobile-link-icon" />}
                        <span style={{ flexGrow: 1 }}>{link.label}</span>
                        <ChevronDown size={16} className={`mobile-submenu-arrow-icon ${isSubExpanded ? 'rotated' : ''}`} />
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className={`mobile-nav-link ${active ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.85rem' }}
                      >
                        {LinkIcon && <LinkIcon size={18} className="mobile-link-icon" />}
                        <span>{link.label}</span>
                      </Link>
                    )}
                    {hasSub && !link.isNonClickable && (
                      <button
                        className="mobile-submenu-toggle"
                        onClick={() => setExpandedSubmenu(isSubExpanded ? null : link.label)}
                      >
                        <ChevronDown size={16} className={`mobile-submenu-arrow-icon ${isSubExpanded ? 'rotated' : ''}`} />
                      </button>
                    )}
                  </div>
                  {hasSub && isSubExpanded && (
                    <div className="mobile-submenu-list">
                      {link.submenu.map((sublink) => {
                        const SubIcon = sublink.icon;
                        return (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            className="mobile-submenu-link"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {SubIcon && <SubIcon size={14} className="mobile-sublink-icon" />}
                            <div className="mobile-sublink-text">
                              <span className="mobile-sublink-title">{sublink.label}</span>
                              {sublink.desc && <span className="mobile-sublink-desc">{sublink.desc}</span>}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mobile-drawer-footer">
            <p className="mobile-footer-text">© {new Date().getFullYear()} Uboontu Foundation</p>
            <p className="mobile-footer-tagline">Social Circularity & Impact</p>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 0.85rem 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
        }

        .header.scrolled {
          padding: 0.4rem 0;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0.9rem 1.75rem;
          width: calc(100% - 3rem);
          background: #ffffff;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(6, 46, 36, 0.08);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px -10px rgba(6, 46, 36, 0.06);
        }

        [data-theme='dark'] .header-container {
          background: #050c09;
          border-color: rgba(255, 255, 255, 0.05);
        }

        .header.scrolled .header-container {
          padding: 0.6rem 1.75rem;
          background: #ffffff;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(18, 33, 26, 0.08);
          box-shadow: 0 10px 30px -10px rgba(6, 46, 36, 0.08),
                      0 1px 3px rgba(0, 0, 0, 0.02);
        }

        [data-theme='dark'] .header.scrolled .header-container {
          background: #091511;
          border-color: rgba(59, 184, 82, 0.12);
          box-shadow: 0 10px 35px -15px rgba(0, 0, 0, 0.4),
                      0 1px 3px rgba(59, 184, 82, 0.04);
        }

        .header-container:hover {
          background: #ffffff !important;
          border-color: rgba(59, 184, 82, 0.25) !important;
          box-shadow: 0 12px 35px -10px rgba(6, 46, 36, 0.12),
                      0 1px 3px rgba(0, 0, 0, 0.02) !important;
        }

        [data-theme='dark'] .header-container:hover {
          background: #091511 !important;
          border-color: rgba(59, 184, 82, 0.3) !important;
          box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.5) !important;
        }

        :global(.logo) {
          display: flex !important;
          align-items: center !important;
          transition: transform var(--transition-fast) !important;
          flex-shrink: 0 !important;
        }

        :global(.logo):hover {
          transform: translateY(-1px) !important;
        }

        :global(.logo-image) {
          height: 56px !important;
          width: auto !important;
          object-fit: contain !important;
          transition: all 0.3s ease !important;
        }

        .header.scrolled :global(.logo-image) {
          height: 48px !important;
        }

        [data-theme='dark'] :global(.logo-image) {
          filter: drop-shadow(0 2px 8px rgba(59, 184, 82, 0.15));
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .nav-item-wrapper {
          position: relative;
          display: inline-block;
        }

        :global(.nav-link) {
          position: relative;
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.5rem 1.15rem 0.65rem 1.15rem;
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          border: 1px solid transparent;
        }

        :global(.nav-link:hover) {
          color: var(--primary);
          background: var(--primary-light);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 10px rgba(59, 184, 82, 0.08);
          border-color: rgba(59, 184, 82, 0.12);
        }

        [data-theme='dark'] :global(.nav-link:hover) {
          background: rgba(59, 184, 82, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        :global(.nav-link.active) {
          color: var(--primary);
          font-weight: 700;
          background: var(--primary-light);
          border: 1px solid rgba(59, 184, 82, 0.15);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 10px rgba(59, 184, 82, 0.06);
        }

        [data-theme='dark'] :global(.nav-link.active) {
          color: var(--primary);
          background: rgba(59, 184, 82, 0.1);
          border-color: rgba(59, 184, 82, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .submenu-arrow-icon {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.7;
          margin-top: 1px;
        }

        .has-submenu:hover .submenu-arrow-icon {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .submenu-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(12px) scale(0.97);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(18, 33, 26, 0.08);
          border-radius: 20px;
          padding: 0.85rem;
          box-shadow: 0 20px 40px -15px rgba(6, 46, 36, 0.12),
                      0 0 0 1px rgba(6, 46, 36, 0.02);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 280px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1000;
        }

        [data-theme='dark'] .submenu-dropdown {
          background: rgba(9, 21, 17, 0.85);
          border-color: rgba(59, 184, 82, 0.15);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
        }

        .has-submenu:hover .submenu-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        :global(.submenu-link) {
          display: flex !important;
          align-items: center !important;
          gap: 1.1rem !important;
          padding: 0.7rem 1rem !important;
          border-radius: 12px !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          text-align: left !important;
          text-decoration: none !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        :global(.submenu-link:hover) {
          background: var(--primary-light) !important;
          transform: translateY(-1px) !important;
        }

        :global([data-theme='dark'] .submenu-link:hover) {
          background: rgba(59, 184, 82, 0.1) !important;
        }

        .sublink-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        [data-theme='dark'] .sublink-icon-wrap {
          background: rgba(255, 255, 255, 0.05);
        }

        :global(.submenu-link:hover) .sublink-icon-wrap {
          background: var(--primary) !important;
          color: white !important;
          transform: scale(1.05) !important;
        }

        .sublink-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .sublink-title {
          font-size: 0.9rem;
          font-weight: 750;
          color: var(--text-primary);
          transition: color 0.25s ease;
          line-height: 1.2;
        }

        .submenu-link:hover .sublink-title {
          color: var(--primary);
        }

        .sublink-desc {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 100px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        [data-theme='dark'] .theme-toggle-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .theme-toggle-btn:hover {
          background: var(--border-color);
          transform: rotate(45deg);
        }

        [data-theme='dark'] .theme-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        :global(.btn-action) {
          padding: 0.6rem 1.5rem !important;
          border-radius: 100px !important;
          font-weight: 600 !important;
          font-size: 0.9rem !important;
          transition: all var(--transition-fast) !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          line-height: 1 !important;
          text-decoration: none !important;
        }

        :global(.donate-btn) {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%) !important;
          color: white !important;
          box-shadow: 0 4px 14px rgba(59, 184, 82, 0.25) !important;
          position: relative !important;
          overflow: hidden !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s ease !important;
        }

        :global(.donate-btn::before) {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: -100% !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          ) !important;
          transition: all 0.6s ease !important;
        }

        :global(.donate-btn:hover::before) {
          left: 100% !important;
        }

        :global(.donate-btn:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(59, 184, 82, 0.35), 0 0 0 2px rgba(59, 184, 82, 0.1) !important;
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 100px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        [data-theme='dark'] .mobile-menu-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-btn:hover {
          background: var(--border-color);
          transform: scale(1.05);
        }

        [data-theme='dark'] .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .theme-toggle-btn :global(svg),
        .mobile-menu-btn :global(svg) {
          width: 20px;
          height: 20px;
          transition: width 0.3s ease, height 0.3s ease;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 88%;
          max-width: 360px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          z-index: 1050;
          box-shadow: -15px 0 50px rgba(6, 46, 36, 0.08);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 2.25rem 1.75rem;
          border-left: 1px solid rgba(18, 33, 26, 0.06);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          overflow-y: auto;
          overflow-x: hidden;
          visibility: hidden;
        }

        [data-theme='dark'] .mobile-drawer {
          background: rgba(9, 21, 17, 0.82);
          border-left: 1px solid rgba(59, 184, 82, 0.1);
          box-shadow: -15px 0 50px rgba(0, 0, 0, 0.6);
        }

        /* Decorative Glow Blobs inside Drawer */
        .drawer-bg-blob {
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 184, 82, 0.12) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .drawer-bg-blob-2 {
          position: absolute;
          top: -100px;
          left: -100px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 26, 20, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1040;
          animation: fadeInBackdrop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        [data-theme='dark'] .mobile-drawer-backdrop {
          background: rgba(0, 0, 0, 0.5);
        }

        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(18, 33, 26, 0.06);
          position: relative;
          z-index: 1;
        }

        [data-theme='dark'] .mobile-drawer-header {
          border-bottom-color: rgba(255, 255, 255, 0.06);
        }

        .mobile-drawer-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-close-btn {
          background: rgba(18, 33, 26, 0.04);
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        [data-theme='dark'] .mobile-close-btn {
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-close-btn:hover {
          transform: rotate(90deg);
          background: rgba(18, 33, 26, 0.08);
        }

        [data-theme='dark'] .mobile-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-drawer.open {
          right: 0;
          visibility: visible;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          height: calc(100% - 70px);
          justify-content: space-between;
          position: relative;
          z-index: 1;
          gap: 2rem;
        }

        .mobile-nav-links-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        :global(.mobile-nav-link) {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary) !important;
          padding: 0.9rem 1.25rem !important;
          border-radius: 16px !important;
          background: rgba(18, 33, 26, 0.04) !important;
          border: 1px solid rgba(18, 33, 26, 0.06) !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          text-decoration: none !important;
          box-sizing: border-box !important;
        }

        :global([data-theme='dark'] .mobile-nav-link) {
          background: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.06) !important;
          color: var(--text-primary) !important;
        }

        .mobile-link-icon {
          color: var(--text-muted);
          transition: color 0.25s ease;
        }

        :global(.mobile-nav-link:hover) {
          color: var(--primary) !important;
          background: rgba(59, 184, 82, 0.08) !important;
          border-color: rgba(59, 184, 82, 0.15) !important;
          transform: translateY(-1.5px) !important;
        }

        :global(.mobile-nav-link:hover) .mobile-link-icon {
          color: var(--primary) !important;
        }

        :global(.mobile-nav-link.active) {
          color: var(--primary) !important;
          background: rgba(59, 184, 82, 0.1) !important;
          border-color: rgba(59, 184, 82, 0.25) !important;
          box-shadow: 0 4px 12px rgba(59, 184, 82, 0.04) !important;
        }

        :global(.mobile-nav-link.active) .mobile-link-icon {
          color: var(--primary) !important;
        }

        :global([data-theme='dark'] .mobile-nav-link:hover) {
          background: rgba(59, 184, 82, 0.08) !important;
          border-color: rgba(59, 184, 82, 0.2) !important;
        }

        :global([data-theme='dark'] .mobile-nav-link.active) {
          background: rgba(59, 184, 82, 0.15) !important;
          border-color: rgba(59, 184, 82, 0.3) !important;
          color: var(--primary) !important;
        }

        .mobile-nav-item-wrap {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .mobile-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .mobile-submenu-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-submenu-arrow-icon {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--text-muted);
        }

        .mobile-submenu-arrow-icon.rotated {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .mobile-submenu-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-left: 1rem;
          margin: 0.5rem 0 0.5rem 1.25rem;
          border-left: 1px dashed rgba(59, 184, 82, 0.2);
        }

        :global(.mobile-submenu-link) {
          display: flex !important;
          align-items: center !important;
          gap: 0.85rem !important;
          padding: 0.65rem 0.85rem !important;
          border-radius: 10px !important;
          transition: all 0.25s ease !important;
          text-align: left !important;
          text-decoration: none !important;
        }

        :global(.mobile-submenu-link:hover) {
          background: var(--primary-light) !important;
        }

        :global([data-theme='dark'] .mobile-submenu-link:hover) {
          background: rgba(59, 184, 82, 0.08) !important;
        }

        .mobile-sublink-icon {
          color: var(--text-muted);
          flex-shrink: 0;
          transition: color 0.25s ease;
        }

        .mobile-submenu-link:hover .mobile-sublink-icon {
          color: var(--primary);
        }

        .mobile-sublink-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .mobile-sublink-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mobile-sublink-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(18, 33, 26, 0.06);
        }

        [data-theme='dark'] .mobile-actions {
          border-top-color: rgba(255, 255, 255, 0.06);
        }

        .mobile-action-btn {
          padding: 0.85rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.95rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-partner {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .mobile-partner:hover {
          background: rgba(18, 33, 26, 0.03);
          transform: translateY(-1px);
        }

        [data-theme='dark'] .mobile-partner:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .mobile-donate {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(59, 184, 82, 0.2);
        }

        .mobile-donate:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(59, 184, 82, 0.3);
        }

        .mobile-drawer-footer {
          text-align: center;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .mobile-footer-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .mobile-footer-tagline {
          font-size: 0.7rem;
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 992px) {
          .desktop-nav, :global(.donate-btn) {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .header {
            padding: 0.75rem 0 !important;
          }
          
          .header.scrolled {
            padding: 0.4rem 0 !important;
          }
          
          .header-container {
            padding: 0.5rem 1.25rem;
            width: calc(100% - 1.2rem) !important;
          }

          :global(.logo-image) {
            height: 48px !important;
          }

          .theme-toggle-btn, .mobile-menu-btn {
            width: 44px !important;
            height: 44px !important;
          }

          .theme-toggle-btn :global(svg),
          .mobile-menu-btn :global(svg) {
            width: 22px !important;
            height: 22px !important;
          }
        }

        @media (max-width: 768px) {
          :global(.logo-image) {
            height: 44px !important;
          }
        }

        @media (max-width: 576px) {
          .header-container {
            padding: 0.5rem 1rem;
            width: calc(100% - 0.8rem) !important;
          }
          
          :global(.logo-image) {
            height: 40px !important;
          }
          
          .mobile-drawer {
            width: 100%;
            max-width: 100%;
            padding: 1.5rem 1.25rem;
            gap: 1.5rem;
          }
          
          .theme-toggle-btn, .mobile-menu-btn {
            width: 40px !important;
            height: 40px !important;
          }

          .theme-toggle-btn :global(svg),
          .mobile-menu-btn :global(svg) {
            width: 20px !important;
            height: 20px !important;
          }
          
          .actions {
            gap: 0.5rem;
          }
        }

        @media (max-width: 360px) {
          .header-container {
            padding: 0.4rem 0.75rem;
            width: calc(100% - 0.6rem) !important;
          }

          :global(.logo-image) {
            height: 34px !important;
          }

          .theme-toggle-btn, .mobile-menu-btn {
            width: 36px !important;
            height: 36px !important;
          }

          .theme-toggle-btn :global(svg),
          .mobile-menu-btn :global(svg) {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </>
  );
}
