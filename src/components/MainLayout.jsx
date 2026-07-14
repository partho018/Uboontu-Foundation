'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
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
          right: '1.5rem',
          bottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: isHovered 
            ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' 
            : 'var(--glass-bg)',
          border: isHovered ? '1px solid transparent' : '1px solid var(--border-color)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: isHovered 
            ? '0 10px 25px rgba(59, 184, 82, 0.4)' 
            : '0 8px 24px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          zIndex: 1200,
          opacity: showBackTop ? 1 : 0,
          transform: showBackTop 
            ? (isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)') 
            : 'translateY(20px) scale(0.9)',
          pointerEvents: showBackTop ? 'all' : 'none',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.25,1,0.5,1), background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <svg 
          width="46" 
          height="46" 
          viewBox="0 0 46 46" 
          style={{ 
            transform: 'rotate(-90deg)', 
            position: 'absolute', 
            top: -1, 
            left: -1,
            pointerEvents: 'none'
          }}
        >
          <circle
            cx="23"
            cy="23"
            r="21"
            fill="transparent"
            stroke={isHovered ? 'rgba(255,255,255,0.15)' : 'var(--border-color)'}
            strokeWidth="2.5"
            style={{ transition: 'stroke 0.3s ease' }}
          />
          <circle
            cx="23"
            cy="23"
            r="21"
            fill="transparent"
            stroke={isHovered ? 'white' : 'var(--primary)'}
            strokeWidth="2.5"
            strokeDasharray="131.95"
            strokeDashoffset={131.95 - (131.95 * scrollPercentage) / 100}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dashoffset 0.1s ease, stroke 0.3s ease'
            }}
          />
        </svg>
        <ChevronUp 
          size={20} 
          color={isHovered ? 'white' : 'var(--primary)'} 
          strokeWidth={2.5} 
          style={{ 
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'transform 0.3s ease, color 0.3s ease',
            zIndex: 2
          }}
        />
      </button>
    </>
  );
}
