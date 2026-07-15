'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/app/Uboontu-Foundation-logo.png';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-card">
          <div className="footer-card-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link href="/" className="logo">
                <Image
                  src={logoImg}
                  alt="Uboontu Foundation"
                  className="logo-image"
                  priority
                />
              </Link>
              <p className="brand-description">
                Transforming waste into opportunity. Building cleaner communities through sustainable waste management, environmental education, and circular economy initiatives.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn"><LinkedinIcon /></a>
                <a href="#" className="social-link" aria-label="Twitter"><TwitterIcon /></a>
                <a href="#" className="social-link" aria-label="Instagram"><InstagramIcon /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-col">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/our-work">Our Work</Link></li>
                <li><Link href="/blog">Blog &amp; News</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Get Involved */}
            <div className="footer-links-col">
              <h3>Get Involved</h3>
              <ul className="footer-links">
                <li><Link href="/get-involved/partner">Partner</Link></li>
                <li><Link href="/get-involved/donate">Donate</Link></li>
                <li><Link href="/get-involved/volunteer">Volunteer</Link></li>
                <li><Link href="/get-involved/internship">Internship</Link></li>
                <li><Link href="/get-involved/careers">Careers</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-links-col">
              <h3>Contact Info</h3>
              <ul className="contact-info">
                <li>info@uboontu.org</li>
                <li>+91 98765 43210</li>
                <li>Delhi NCR, India</li>
              </ul>
            </div>
          </div>

          <div className="footer-card-divider" />

          <div className="footer-card-bottom">
            <p>&copy; {currentYear} Uboontu Foundation. All rights reserved.</p>
            <div className="bottom-links">
              <Link href="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-watermark">Uboontu</div>

      <style jsx>{`
        .footer-wrapper {
          background: linear-gradient(to bottom, transparent 0%, var(--bg-tertiary) 8rem);
          padding: 8rem 0 3rem;
          margin-top: -8rem;
          position: relative;
          z-index: 10;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        .footer-wrapper > * {
          pointer-events: auto;
        }

        .footer-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 28px;
          padding: 4rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .footer-card-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 4rem;
          padding-bottom: 3.5rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        :global(.logo) {
          display: flex !important;
          align-items: center !important;
          flex-shrink: 0 !important;
        }

        :global(.logo-image) {
          height: 52px !important;
          width: auto !important;
          object-fit: contain !important;
          transition: all 0.3s ease !important;
        }

        .brand-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 320px;
        }

        .social-links {
          display: flex;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: var(--primary);
          transform: translateY(-2px);
        }

        .footer-links-col h3 {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0;
          margin: 0;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--primary);
        }

        .contact-info {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0;
          margin: 0;
        }

        .contact-info li {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .footer-card-divider {
          height: 1px;
          background-color: var(--border-color);
          width: 100%;
          margin-bottom: 2.5rem;
        }

        .footer-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-card-bottom p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
        }

        .bottom-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .bottom-links a:hover {
          color: var(--primary);
        }

        .separator {
          color: var(--border-color);
        }

        .footer-watermark {
          font-size: 14vw;
          font-weight: 900;
          color: var(--text-primary);
          opacity: 0.05;
          text-align: center;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          margin-top: 2rem;
          margin-bottom: -5rem;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -2px;
        }

        @media (max-width: 992px) {
          .footer-card {
            padding: 3rem;
          }
          .footer-card-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 3rem;
          }
          .footer-card-grid > div:last-child {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .footer-card-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-card-grid > div:last-child {
            grid-column: span 2;
          }
        }

        @media (max-width: 576px) {
          .footer-wrapper {
            padding: 4rem 0 2rem;
          }
          .footer-card {
            padding: 2.5rem 1.5rem;
            border-radius: 20px;
          }
          .footer-card-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-bottom: 2rem;
          }
          .footer-card-grid > div:last-child {
            grid-column: span 1;
          }
          .footer-card-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
          .brand-description {
            max-width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
