'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Wheat, Recycle, Settings, Megaphone, Handshake, Users } from 'lucide-react';

function Counter({ endValue, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = countRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let target = 0;
    
    if (typeof endValue === 'string') {
      const cleanStr = endValue.replace(/,/g, '');
      if (cleanStr.includes('-')) {
        const parts = cleanStr.split('-');
        target = parseInt(parts[1].trim(), 10);
      } else {
        target = parseInt(cleanStr, 10);
      }
    } else {
      target = endValue;
    }

    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, endValue, duration]);

  const formatNumber = (num) => {
    if (typeof endValue === 'string' && endValue.includes('-')) {
      return isVisible ? endValue : '0';
    }
    return num.toLocaleString();
  };

  return (
    <span ref={countRef}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function ImpactCounters() {
  const stats = [
    {
      value: '11,117 - 11,348',
      suffix: ' MT',
      label: 'Waste Diverted',
      sublabel: '11,117 - 11348 MT of waste diverted from landfills',
      icon: Trash2,
      color: '#3BB852',
      bgLight: 'rgba(59, 184, 82, 0.08)',
    },
    {
      value: '4,744',
      suffix: ' MT',
      label: 'Wet Waste Processed',
      sublabel: '4744 MT of wet waste processed into compost and animal feed',
      icon: Wheat,
      color: '#0d9488',
      bgLight: 'rgba(13, 148, 136, 0.08)',
    },
    {
      value: '5,792',
      suffix: ' MT',
      label: 'Dry Waste Recycled',
      sublabel: '5792 MT dry waste scientifically segregated and recycled',
      icon: Recycle,
      color: '#0d9488',
      bgLight: 'rgba(13, 148, 136, 0.08)',
    },
    {
      value: '68',
      suffix: '',
      label: 'Waste Systems',
      sublabel: '68 Community-level waste management systems established',
      icon: Settings,
      color: '#d97706',
      bgLight: 'rgba(217, 119, 6, 0.08)',
    },
    {
      value: '1,390',
      suffix: '',
      label: 'Awareness Conducted',
      sublabel: '1390 Awareness programs conducted in schools, RWAs and institutions',
      icon: Megaphone,
      color: '#8b5cf6',
      bgLight: 'rgba(139, 92, 246, 0.08)',
    },
    {
      value: '68',
      suffix: '',
      label: 'Partnerships',
      sublabel: '68 Partnerships with RWAs, municipalities, and corporates',
      icon: Handshake,
      color: '#3b82f6',
      bgLight: 'rgba(59, 130, 246, 0.08)',
    },
    {
      value: '144,500',
      suffix: '',
      label: 'Households Benefited',
      sublabel: '144,500 Households benefited through various programs',
      icon: Users,
      color: '#ec4899',
      bgLight: 'rgba(236, 72, 153, 0.08)',
    },
  ];

  return (
    <div className="impact-split-container">
      {/* Left Column: Title & Description */}
      <div className="impact-left-col">
        <div className="scroll-reveal reveal-fade-right" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
          <span className="badge badge-accent">Snapshot</span>
          <h2 className="impact-main-title">Impact – 2025–26</h2>
          <div className="impact-title-divider" />
          <p className="impact-main-desc">
            Our projects directly and indirectly impact lakhs of citizens across urban and rural communities
            through cleaner surroundings, better waste systems, and environmental awareness.
          </p>
          <div className="impact-img-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80" 
              alt="Impact Snapshot" 
              className="impact-left-img"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Sleek left-accented statistics */}
      <div className="impact-right-col">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className={`stat-node scroll-reveal reveal-fade-up delay-${(index % 4 + 1) * 100}`}
              style={{ 
                '--accent-color': stat.color, 
                '--accent-glow': stat.color + '26', 
                '--bg-light': stat.bgLight 
              }}
            >
              <div className="stat-node-header">
                <div className="stat-node-icon">
                  <Icon size={16} />
                </div>
                <span className="stat-node-label">{stat.label}</span>
              </div>
              <h3 className="stat-node-number">
                <Counter endValue={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="stat-node-desc">{stat.sublabel}</p>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .impact-split-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          padding: 2rem 0;
          align-items: start;
        }

        .impact-left-col {
          position: sticky;
          top: 8rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .impact-main-title {
          font-size: 3rem;
          font-weight: 850;
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .impact-title-divider {
          width: 60px;
          height: 4px;
          background: var(--primary);
          border-radius: 99px;
        }

        .impact-main-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 500;
        }

        .impact-img-wrapper {
          position: relative;
          width: 100%;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .impact-img-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(245, 158, 11, 0.08);
          border: 1.5px solid #f59e0b;
          border-radius: 20px;
          transform: rotate(-3deg);
          z-index: 1;
        }

        .impact-img-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(59, 130, 246, 0.08);
          border: 1.5px solid #3b82f6;
          border-radius: 20px;
          transform: rotate(3deg);
          z-index: 1;
        }

        .impact-left-img {
          position: relative;
          z-index: 2;
          width: 100%;
          border-radius: 20px;
          object-fit: cover;
          height: 320px;
          border: 1px solid var(--border-color);
          box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.15);
          transform: none;
        }

        .impact-right-col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        .stat-node {
          background: var(--glass-bg);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01), 0 2px 4px rgba(0, 0, 0, 0.01);
        }

        .stat-node:hover {
          transform: translateY(-6px);
          border-color: var(--accent-color);
          box-shadow: 0 24px 48px -12px var(--accent-glow);
        }

        .stat-node-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 2;
        }

        .stat-node-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-light);
          color: var(--accent-color);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease;
        }

        .stat-node:hover .stat-node-icon {
          transform: scale(1.08) rotate(5deg);
        }

        .stat-node-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          z-index: 2;
        }

        .stat-node-number {
          font-size: 2rem;
          font-weight: 850;
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.02em;
          z-index: 2;
        }

        .stat-node-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.45;
          font-weight: 500;
          z-index: 2;
        }

        @media (max-width: 992px) {
          .impact-split-container {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .impact-left-col {
            position: static;
          }
          .impact-main-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 650px) {
          .impact-right-col {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .impact-split-container {
            gap: 2rem;
            padding: 1rem 0;
          }
          .impact-main-title {
            font-size: 2.15rem;
          }
          .impact-main-desc {
            font-size: 1rem;
          }
          .impact-left-img {
            height: 220px;
          }
          .impact-img-wrapper {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .impact-img-wrapper::before {
            transform: rotate(-1.5deg);
          }
          .impact-img-wrapper::after {
            transform: rotate(1.5deg);
          }
          .stat-node {
            padding: 1.5rem 1.25rem;
            gap: 1rem;
          }
          .stat-node-number {
            font-size: 1.75rem;
          }
          .stat-node-desc {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  );
}
