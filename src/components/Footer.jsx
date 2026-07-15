'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/app/Uboontu-Foundation-logo.png';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
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

        {/* Get Involved Links */}
        <div className="footer-links-col">
          <h3>Get Involved</h3>
          <ul className="footer-links">
            <li><Link href="/get-involved/partner">Partner</Link></li>
            <li><Link href="/get-involved/donate">Donate</Link></li>
            <li><Link href="/get-involved/volunteer">Volunteer</Link></li>
            <li><Link href="/get-involved/internship">Internship</Link></li>
            <li><Link href="/get-involved/careers">Join With Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-links-col contact-col">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <Mail size={16} className="contact-icon" />
              <span>info@uboontu.org</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>123, Green Tech Park, Sector 5, Bengaluru, Karnataka, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>&copy; {currentYear} Uboontu Foundation. All rights reserved.</p>
          <div className="bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-radius: 40px 40px 0 0;
          margin-top: -40px;
          position: relative;
          z-index: 10;
          overflow: hidden;
          padding: 6rem 0 0;
          color: var(--text-primary);
          background-image: 
            radial-gradient(circle at 10% 0%, rgba(59, 184, 82, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 90% 0%, rgba(234, 179, 8, 0.05) 0%, transparent 40%);
        }

        [data-theme='dark'] .footer {
          background-image: 
            radial-gradient(circle at 10% 0%, rgba(59, 184, 82, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 90% 0%, rgba(234, 179, 8, 0.08) 0%, transparent 40%);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 4rem;
          padding-bottom: 5rem;
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
          height: 64px !important;
          width: auto !important;
          object-fit: contain !important;
          transition: all 0.3s ease !important;
        }

        [data-theme='dark'] :global(.logo-image) {
          filter: drop-shadow(0 2px 8px rgba(59, 184, 82, 0.15));
        }

        .brand-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .social-link:hover {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-4px) rotate(8deg);
          box-shadow: 0 4px 12px rgba(59, 184, 82, 0.2);
        }

        .footer-links-col h3 {
          font-size: 1.15rem;
          margin-bottom: 2rem;
          font-weight: 700;
          position: relative;
          padding-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .footer-links-col h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 35px;
          height: 3px;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .footer-links a::before {
          content: '→';
          font-size: 0.8rem;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.3s ease;
          color: var(--primary);
        }

        .footer-links a:hover {
          color: var(--primary);
          transform: translateX(4px);
        }

        .footer-links a:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        .contact-info {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-info li {
          display: flex;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .contact-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding: 2rem 0;
          background-color: var(--bg-tertiary);
        }

        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bottom-container p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
        }

        .bottom-links a {
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .bottom-links a:hover {
          color: var(--primary);
        }

        .separator {
          color: var(--border-color);
        }

        .back-to-top {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
        }

        .back-to-top:hover {
          color: var(--primary-hover);
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 576px) {
          .footer {
            padding: 4rem 0 0;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-bottom: 3rem;
          }
          .bottom-container {
            flex-direction: column;
            text-align: center;
          }
          :global(.logo) {
            font-size: 1.3rem !important;
          }
          .brand-description {
            font-size: 0.9rem;
          }
          .footer-links-col h3 {
            margin-bottom: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
}
