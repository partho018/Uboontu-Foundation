'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import logoImg from '@/app/Uboontu-Foundation-logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // '', 'loading', 'success'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-card">
          <div className="footer-main-layout">
            
            {/* Left Side: Brand Logo and Column Links */}
            <div className="footer-left-side">
              <div className="footer-logo-row">
                <Link href="/" className="logo">
                  <Image
                    src={logoImg}
                    alt="Uboontu Foundation"
                    className="logo-image"
                    priority
                  />
                </Link>
              </div>
              
              <div className="footer-links-grid">
                {/* Column 1 */}
                <div className="footer-links-col">
                  <h3>Company</h3>
                  <ul className="footer-links">
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/our-work">Our Work</Link></li>
                    <li><Link href="/blog">Blog &amp; News</Link></li>
                    <li><Link href="/get-involved/careers">Careers</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="footer-links-col">
                  <h3>Explore</h3>
                  <ul className="footer-links">
                    <li><Link href="/get-involved/volunteer">Volunteer</Link></li>
                    <li><Link href="/get-involved/donate">Donate</Link></li>
                    <li><Link href="/get-involved/partner">Partner</Link></li>
                    <li><Link href="/get-involved/internship">Internship</Link></li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="footer-links-col">
                  <h3>Community</h3>
                  <ul className="footer-links">
                    <li><Link href="/initiatives/waste-to-resource">Waste-to-Resource</Link></li>
                    <li><Link href="/initiatives/education">Eco Education</Link></li>
                    <li><Link href="/initiatives/circular-economy">Circular Economy</Link></li>
                    <li><Link href="/contact?type=story">Share Your Story</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side: Newsletter Subscription */}
            <div className="footer-right-side">
              <div>
                <h2 className="subscribe-title">
                  Subscribe and get 5 weekly stories for <span className="elegant-serif text-accent">living green</span>
                </h2>
                <p className="subscribe-description">
                  Get the foundational insights for building waste-free, sustainable communities. Built by environmental experts with years of on-ground impact.
                </p>
              </div>
              
              {status === 'success' ? (
                <div className="subscribe-success-msg">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Thank you! You have successfully subscribed to our newsletter.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="subscribe-form-row">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="subscribe-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                  />
                  <button type="submit" className="subscribe-button" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Layout inside the Card */}
          <div className="footer-bottom-layout">
            {/* Left: Apps & QR Badge */}
            <div className="footer-apps-container">
              <div className="qr-code-box" title="Scan to Donate">
                <svg viewBox="0 0 100 100" width="80" height="80" fill="currentColor">
                  {/* Finder pattern Top-Left */}
                  <rect x="0" y="0" width="28" height="28" rx="4" />
                  <rect x="4" y="4" width="20" height="20" rx="2" fill="white" />
                  <rect x="8" y="8" width="12" height="12" rx="1" />
                  
                  {/* Finder pattern Top-Right */}
                  <rect x="72" y="0" width="28" height="28" rx="4" />
                  <rect x="76" y="4" width="20" height="20" rx="2" fill="white" />
                  <rect x="80" y="8" width="12" height="12" rx="1" />
                  
                  {/* Finder pattern Bottom-Left */}
                  <rect x="0" y="72" width="28" height="28" rx="4" />
                  <rect x="4" y="76" width="20" height="20" rx="2" fill="white" />
                  <rect x="8" y="80" width="12" height="12" rx="1" />
                  
                  {/* Alignment pattern */}
                  <rect x="76" y="76" width="12" height="12" rx="1" />
                  <rect x="80" y="80" width="4" height="4" rx="0.5" fill="white" />
                  
                  {/* Code pixels / lines */}
                  <path d="M36,4 h4 v4 h-4 z M44,4 h8 v4 h-8 z M60,4 h4 v4 h-4 z M36,12 h12 v4 h-12 z M56,12 h8 v4 h-8 z M36,20 h4 v4 h-4 z M48,20 h16 v4 h-16 z" />
                  <path d="M4,36 h4 v8 h-4 z M16,36 h12 v4 h-12 z M36,36 h8 v4 h-8 z M52,36 h4 v4 h-4 z M64,36 h8 v4 h-8 z M80,36 h16 v4 h-16 z" />
                  <path d="M8,44 h8 v4 h-8 z M24,44 h8 v4 h-8 z M40,44 h12 v4 h-12 z M60,44 h8 v4 h-8 z M84,44 h4 v8 h-4 z M92,44 h4 v4 h-4 z" />
                  <path d="M0,52 h12 v4 h-12 z M20,52 h4 v4 h-4 z M28,52 h12 v4 h-12 z M48,52 h8 v4 h-8 z M68,52 h12 v4 h-12 z M88,52 h8 v4 h-8 z" />
                  <path d="M8,60 h8 v4 h-8 z M20,60 h4 v4 h-4 z M32,60 h16 v4 h-16 z M56,60 h4 v4 h-4 z M68,60 h8 v4 h-8 z M84,60 h12 v4 h-12 z" />
                  <path d="M36,68 h12 v4 h-12 z M52,68 h4 v4 h-4 z M60,68 h8 v4 h-8 z M76,68 h8 v4 h-8 z M88,68 h8 v4 h-8 z" />
                  <path d="M36,76 h8 v4 h-8 z M48,76 h12 v4 h-12 z M64,76 h4 v4 h-4 z M36,84 h4 v8 h-4 z M48,84 h16 v4 h-16 z M68,84 h4 v4 h-4 z" />
                  <path d="M36,92 h12 v4 h-12 z M56,92 h8 v4 h-8 z M68,92 h4 v4 h-4 z" />
                </svg>
              </div>
              
              <div className="app-store-buttons">
                <a href="#" className="app-btn" aria-label="Google Play">
                  <svg viewBox="0 0 256 256" width="22" height="22">
                    <path d="M12.2,2.8C10,5.1,8.7,8.7,8.7,13.2v229.7c0,4.5,1.3,8.1,3.5,10.3l1.2,1.2L142,126v-3.1L13.4,1.6L12.2,2.8z" fill="#00A1E4" />
                    <path d="M185.3,169.7L142,126v-3.1l43.3-43.7l1.2,0.7l51.2,29.1c14.6,8.3,14.6,21.9,0,30.2l-51.2,29.1L185.3,169.7z" fill="#FFC72C" />
                    <path d="M186.5,169L142,124.5L13.4,253.1c4.8,5.1,12.7,5.7,21.8,0.5l151.3-86L186.5,169z" fill="#ED1C24" />
                    <path d="M186.5,80L35.2,19C26.1,13.8,18.2,14.4,13.4,19.5L142,124.5L186.5,80z" fill="#00F076" />
                  </svg>
                  <div className="app-btn-text">
                    <span className="app-btn-subtitle">GET IT ON</span>
                    <span className="app-btn-title">Google Play</span>
                  </div>
                </a>
                
                <a href="#" className="app-btn" aria-label="App Store">
                  <svg viewBox="0 0 256 256" width="22" height="22" fill="currentColor">
                    <path d="M150.37 130.25c-.24-23.82 19.34-35.29 20.26-35.83-11.08-16.21-28.32-18.43-34.42-18.96-14.61-1.5-28.52 8.61-35.93 8.61-7.42 0-19.13-8.42-31.39-8.19-16.14.24-31.02 9.38-39.34 23.82-16.8 29.16-4.3 72.16 11.94 95.61 7.95 11.47 17.37 24.3 29.76 23.82 12-4.8 16.53-12 31.02-12s18.57 7.2 31 11.77c12.7.48 21-11.47 28.87-23 9.1-13.3 12.87-26.2 13.08-26.85-.27-.12-25.1-9.62-25.35-37.07zM133.4 56.45c6.54-7.92 10.95-18.93 9.75-29.95-9.47.38-20.93 6.31-27.73 14.23-5.83 6.69-10.92 17.85-9.56 28.71 10.57.82 21.03-5.06 27.54-12.99z" />
                  </svg>
                  <div className="app-btn-text">
                    <span className="app-btn-subtitle">Download on the</span>
                    <span className="app-btn-title">App Store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Social Circles & Links */}
            <div className="footer-legal-social">
              <div className="social-circles-row">
                <a href="#" className="social-circle-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="#" className="social-circle-btn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="social-circle-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="social-circle-btn" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="social-circle-btn" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.09-1.33-.76-.51-1.37-1.19-1.83-1.97v6.62c.03 2.14-.58 4.31-1.98 5.95-1.55 1.85-3.99 2.78-6.37 2.45-2.61-.31-4.99-2.13-5.84-4.66-.99-2.88-.23-6.28 1.95-8.41 1.77-1.78 4.35-2.52 6.78-2.01v4.16c-1.22-.32-2.57-.1-3.55.7-.93.73-1.39 1.95-1.25 3.12.12 1.25.9 2.39 2.02 2.87 1.16.53 2.58.37 3.57-.42.75-.58 1.12-1.52 1.09-2.48V.02z" />
                  </svg>
                </a>
              </div>
              
              <div className="legal-links-column">
                <div className="legal-links-row">
                  <Link href="/privacy" className="legal-link">Privacy Policy</Link>
                  <span className="separator">•</span>
                  <Link href="/terms" className="legal-link">Terms of Service</Link>
                </div>
                <div className="legal-links-row">
                  <a href="#" className="legal-link">Do Not Sell or Share My Personal Information</a>
                  <span className="separator">•</span>
                  <a href="#" className="legal-link">Consumer Health Data Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outside Card Section */}
        <div className="footer-outside-wrapper">
          <div className="footer-disclaimers">
            <p className="disclaimer-text">
              *Uboontu Foundation is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the full extent of the law. Clean-up drives and community initiatives are carried out in cooperation with local municipal authorities.
            </p>
            <p className="disclaimer-text">
              Uboontu Foundation is a circular economy and waste management platform. We are not a waste hauling service or a government agency. All recycling, educational programs, and waste-to-resource services are provided by independent local green partners and community volunteers.
            </p>
          </div>

          <div className="footer-brand-watermark-row">
            <div className="brand-watermark-left">Uboontu Foundation</div>
            <div className="brand-watermark-right">uboontufoundation.org</div>
          </div>
        </div>
      </div>



      <style jsx>{`
        .footer-wrapper {
          background: linear-gradient(to bottom, transparent 0%, var(--footer-outer-bg) 8rem);
          padding: 8rem 0 3rem;
          margin-top: -8rem;
          position: relative;
          z-index: 10;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          
          --footer-outer-bg: #F4F0E8;
          --footer-card-bg: #FAF8F5;
          --footer-text-primary: #3C2B22;
          --footer-text-secondary: #8A7E72;
          --footer-accent: #A75D3F;
          --footer-border: #EAE6DF;
          --footer-input-bg: #F5F2EC;
        }

        [data-theme='dark'] .footer-wrapper {
          --footer-outer-bg: #050c09;
          --footer-card-bg: #091511;
          --footer-text-primary: #f0f7f4;
          --footer-text-secondary: #a3b8b0;
          --footer-accent: #3BB852;
          --footer-border: rgba(59, 184, 82, 0.15);
          --footer-input-bg: #0c201a;
        }

        .footer-wrapper > * {
          pointer-events: auto;
        }

        .footer-card {
          background-color: var(--footer-card-bg);
          border: 1px solid var(--footer-border);
          border-radius: 40px;
          padding: 5rem;
          box-shadow: 0 30px 60px rgba(46, 38, 32, 0.05);
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5rem;
          transition: all 0.3s ease;
        }

        .footer-main-layout {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 5rem;
        }

        .footer-left-side {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .footer-logo-row {
          display: flex;
          align-items: center;
        }

        :global(.logo) {
          display: flex !important;
          align-items: center !important;
          flex-shrink: 0 !important;
        }

        :global(.logo-image) {
          height: 48px !important;
          width: auto !important;
          object-fit: contain !important;
          transition: all 0.3s ease !important;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .footer-links-col h3 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
          font-weight: 700;
          color: var(--footer-text-primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 0;
          margin: 0;
        }

        .footer-links a {
          color: var(--footer-text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--footer-accent);
          transform: translateX(3px);
        }

        .footer-right-side {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 500px;
          justify-self: end;
          width: 100%;
        }

        .subscribe-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--footer-text-primary);
          line-height: 1.25;
          margin-bottom: 1rem;
        }

        .text-accent {
          color: var(--footer-accent) !important;
        }

        .elegant-serif {
          font-family: 'Playfair Display', Georgia, serif !important;
          font-style: italic !important;
          font-weight: 700 !important;
        }

        .subscribe-description {
          font-size: 1rem;
          color: var(--footer-text-secondary);
          line-height: 1.6;
        }

        .subscribe-form-row {
          display: flex;
          gap: 0.85rem;
          width: 100%;
        }

        .subscribe-input {
          flex: 1;
          height: 52px;
          border-radius: 9999px;
          border: 1px solid var(--footer-border);
          background-color: var(--footer-input-bg);
          padding: 0 1.5rem;
          font-size: 0.95rem;
          color: var(--footer-text-primary);
          outline: none;
          transition: all 0.2s ease;
        }

        .subscribe-input::placeholder {
          color: var(--footer-text-secondary);
          opacity: 0.6;
        }

        .subscribe-input:focus {
          border-color: var(--footer-accent);
          box-shadow: 0 0 0 3px rgba(167, 93, 63, 0.08);
        }

        .subscribe-button {
          height: 52px;
          padding: 0 2rem;
          border-radius: 9999px;
          border: 1.5px solid var(--footer-accent);
          background-color: transparent;
          color: var(--footer-accent);
          font-size: 0.95rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .subscribe-button:hover {
          background-color: var(--footer-accent);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .subscribe-success-msg {
          font-size: 1rem;
          color: #2F9241;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: rgba(59, 184, 82, 0.06);
          padding: 1rem 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(59, 184, 82, 0.15);
        }

        .footer-bottom-layout {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
        }

        .footer-apps-container {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .qr-code-box {
          background-color: #FFFFFF;
          border: 1px solid var(--footer-border);
          border-radius: 20px;
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 12px rgba(46, 38, 32, 0.03);
          color: #000000;
        }

        .app-store-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .app-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: #FFFFFF;
          border: 1px solid var(--footer-border);
          border-radius: 14px;
          padding: 8px 16px;
          text-decoration: none;
          color: #000000;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(46, 38, 32, 0.01);
          width: 175px;
        }

        .app-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(46, 38, 32, 0.06);
          border-color: var(--footer-accent);
        }

        .app-btn-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.25;
        }

        .app-btn-subtitle {
          font-size: 0.65rem;
          font-weight: 500;
          color: #70665E;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .app-btn-title {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .footer-legal-social {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.75rem;
        }

        .social-circles-row {
          display: flex;
          gap: 0.75rem;
        }

        .social-circle-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--footer-border);
          background-color: #FFFFFF;
          color: #3C2B22;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(46, 38, 32, 0.02);
        }

        [data-theme='dark'] .social-circle-btn {
          background-color: #0c201a;
          color: #f0f7f4;
        }

        .social-circle-btn:hover {
          background-color: var(--footer-accent);
          color: #FFFFFF;
          border-color: var(--footer-accent);
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(167, 93, 63, 0.15);
        }

        .legal-links-column {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.65rem;
        }

        .legal-links-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legal-link {
          font-size: 0.825rem;
          color: var(--footer-text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
          font-weight: 500;
        }

        .legal-link:hover {
          color: var(--footer-accent);
        }

        .separator {
          color: var(--footer-border);
          font-size: 0.75rem;
        }

        .footer-outside-wrapper {
          width: 100%;
          margin-top: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .footer-disclaimers {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-width: 100%;
        }

        .disclaimer-text {
          font-size: 0.785rem;
          color: var(--footer-text-secondary);
          line-height: 1.6;
          opacity: 0.75;
        }

        .footer-brand-watermark-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 2.5rem;
        }

        .brand-watermark-left {
          font-size: clamp(2.2rem, 9vw, 5.5rem);
          font-weight: 900;
          font-family: 'Red Hat Display', sans-serif;
          color: var(--footer-text-primary);
          line-height: 0.85;
          letter-spacing: -0.05em;
          white-space: nowrap;
        }

        .brand-watermark-right {
          font-size: clamp(1.2rem, 4vw, 2.25rem);
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: var(--footer-text-primary);
          line-height: 0.85;
          letter-spacing: -0.03em;
        }



        @media (max-width: 1024px) {
          .footer-card {
            padding: 3.5rem;
            gap: 4rem;
          }
          
          .footer-main-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .footer-right-side {
            max-width: 100%;
            justify-self: stretch;
          }
        }

        @media (max-width: 768px) {
          .footer-bottom-layout {
            flex-direction: column;
            align-items: center;
            gap: 3rem;
          }

          .footer-apps-container {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1.25rem;
            width: 100%;
          }

          .footer-legal-social {
            align-items: center;
            gap: 1.5rem;
          }

          .legal-links-column {
            align-items: center;
          }
        }

        @media (max-width: 576px) {
          .footer-card {
            padding: 2rem 1.25rem;
            border-radius: 28px;
            gap: 3rem;
          }

          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
          }

          .footer-links-grid > :nth-child(3) {
            grid-column: span 2;
          }

          .subscribe-title {
            font-size: 1.85rem;
          }

          .subscribe-form-row {
            flex-direction: column;
            gap: 0.75rem;
          }

          .subscribe-input {
            flex: none;
            width: 100%;
          }

          .subscribe-button {
            width: 100%;
          }

          .footer-brand-watermark-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.25rem;
          }

          .legal-links-row {
            flex-direction: column;
            gap: 0.65rem;
            text-align: center;
          }

          .legal-links-row .separator {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
