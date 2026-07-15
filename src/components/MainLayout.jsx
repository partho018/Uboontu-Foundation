'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import DonateModal from './DonateModal';
import PartnerModal from './PartnerModal';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname && pathname.startsWith('/admin');
  const [donateOpen, setDonateOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleOpenDonate = () => setDonateOpen(true);
    const handleOpenPartner = () => setPartnerOpen(true);

    window.addEventListener('open-donate', handleOpenDonate);
    window.addEventListener('open-partner', handleOpenPartner);

    return () => {
      window.removeEventListener('open-donate', handleOpenDonate);
      window.removeEventListener('open-partner', handleOpenPartner);
    };
  }, []);

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add js-enabled class to body once mounted on the client
  useEffect(() => {
    document.body.classList.add('js-enabled');
    return () => {
      document.body.classList.remove('js-enabled');
    };
  }, []);

  // IntersectionObserver for scroll reveal animations
  useEffect(() => {
    let observer;
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '5% 0px -5% 0px', // Trigger boundaries offset slightly for smoother up/down transitions
        threshold: 0.05,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.scroll-reveal');
      revealElements.forEach((el) => observer.observe(el));
    }, 150); // slight timeout to allow the DOM to fully render

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname, children]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header 
        onDonateClick={() => setDonateOpen(true)} 
        onPartnerClick={() => setPartnerOpen(true)} 
      />
      
      {children}
      
      <Footer />

      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
      <PartnerModal isOpen={partnerOpen} onClose={() => setPartnerOpen(false)} />

      {/* Back to Top — circular progress scroll */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
          background: 'var(--primary)',
          border: 'none',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: isHovered 
            ? '0 10px 25px rgba(59, 184, 82, 0.3)' 
            : '0 8px 24px rgba(59, 184, 82, 0.15)',
          cursor: 'pointer',
          zIndex: 1200,
          opacity: showBackTop ? 1 : 0,
          transform: showBackTop 
            ? (isHovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)') 
            : 'translateY(20px) scale(0.9)',
          pointerEvents: showBackTop ? 'all' : 'none',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.25,1,0.5,1), background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <ArrowUp 
          size={16} 
          color="white" 
          strokeWidth={2.5} 
          style={{ 
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition: 'transform 0.3s ease, color 0.3s ease',
          }}
        />
        <span 
          style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'var(--font-body)',
            transition: 'color 0.3s ease',
          }}
        >
          Back to Top
        </span>
      </button>
    </>
  );
}
