'use client';

import Link from 'next/link';
import { Home, Compass, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* Visual Circle Accents */}
      <div className="accent-circle circle-1" />
      <div className="accent-circle circle-2" />
      
      <div className="not-found-content">
        <div className="error-badge">
          <AlertCircle size={16} />
          <span>Error 404</span>
        </div>
        
        <h1 className="error-title">
          Page Not <span className="elegant-serif text-gradient">Found</span>
        </h1>
        
        <p className="error-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* 3D-like Custom SVG Illustration */}
        <div className="illustration-wrapper">
          <svg viewBox="0 0 200 200" className="floating-illustration">
            <defs>
              <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3BB852" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="1" />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#062e24" floodOpacity="0.08" />
              </filter>
            </defs>
            
            {/* Isometric block / platform */}
            <polygon points="100,50 160,85 100,120 40,85" fill="#ffffff" stroke="#f1f5f9" strokeWidth="2" filter="url(#shadow)" />
            <polygon points="40,85 100,120 100,150 40,115" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
            <polygon points="100,120 160,85 160,115 100,150" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Glowing 3D "404" numbers floating */}
            <g transform="translate(0, -10)" className="floating-group">
              {/* Giant "404" label inside a glassmorphic badge */}
              <rect x="52" y="62" width="96" height="52" rx="14" fill="rgba(255, 255, 255, 0.8)" stroke="rgba(59, 184, 82, 0.25)" strokeWidth="1.5" style={{ backdropFilter: 'blur(8px)' }} />
              <text x="100" y="98" textAnchor="middle" fill="#12211a" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: '800', letterSpacing: '1px' }}>
                404
              </text>
            </g>
            
            {/* Small floating green leaf */}
            <path d="M145,45 C150,55 140,70 130,65 C125,60 135,50 145,45 Z" fill="url(#grad-green)" />
            <path d="M55,105 C60,115 50,130 40,125 C35,120 45,110 55,105 Z" fill="url(#grad-gold)" />
          </svg>
        </div>

        <div className="action-buttons">
          <Link href="/" className="btn-home">
            <Home size={18} />
            <span>Go Back Home</span>
          </Link>
          <Link href="/blog" className="btn-secondary">
            <Compass size={18} />
            <span>Browse Blogs</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .not-found-container {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          overflow: hidden;
          padding: 120px 24px;
        }

        /* Decorative circles */
        .accent-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 1;
        }
        .circle-1 {
          width: 300px;
          height: 300px;
          background: rgba(59, 184, 82, 0.1);
          top: 15%;
          left: 10%;
        }
        .circle-2 {
          width: 350px;
          height: 350px;
          background: rgba(234, 179, 8, 0.07);
          bottom: 15%;
          right: 10%;
        }

        .not-found-content {
          position: relative;
          z-index: 2;
          max-width: 580px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .error-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(59, 184, 82, 0.08);
          color: #3bb852;
          border: 1px solid rgba(59, 184, 82, 0.15);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .error-title {
          font-family: 'Outfit', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #12211a;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .elegant-serif {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 600;
        }

        .text-gradient {
          background: linear-gradient(135deg, #3bb852 0%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .error-description {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 460px;
        }

        /* Illustration styling */
        .illustration-wrapper {
          width: 180px;
          height: 180px;
          margin-bottom: 40px;
        }

        .floating-illustration {
          width: 100%;
          height: 100%;
        }

        .floating-group {
          animation: floatAnimation 4s ease-in-out infinite;
        }

        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .action-buttons :global(.btn-home), 
        .action-buttons :global(.btn-secondary) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .action-buttons :global(.btn-home) {
          background: #3bb852;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(59, 184, 82, 0.2);
        }

        .action-buttons :global(.btn-home:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 184, 82, 0.3);
          color: #ffffff;
        }

        .action-buttons :global(.btn-secondary) {
          background: rgba(18, 33, 26, 0.04);
          color: #12211a;
          border: 1px solid rgba(18, 33, 26, 0.08);
        }

        .action-buttons :global(.btn-secondary:hover) {
          background: rgba(18, 33, 26, 0.08);
          transform: translateY(-2px);
          color: #12211a;
        }

        @media (max-width: 600px) {
          .error-title {
            font-size: 34px;
          }
          .action-buttons {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }
          .action-buttons :global(.btn-home), 
          .action-buttons :global(.btn-secondary) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
