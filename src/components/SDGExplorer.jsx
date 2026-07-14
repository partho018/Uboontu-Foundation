'use client';

import { useState } from 'react';
import { Target, ArrowRight, ShieldCheck, HeartPulse, Recycle, HelpCircle } from 'lucide-react';

export default function SDGExplorer() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSdg, setSelectedSdg] = useState(null);

  const categories = [
    { id: 'all', label: 'All Aligned Goals', icon: Target },
    { id: 'social', label: 'Social & Inclusion', icon: ShieldCheck },
    { id: 'circular', label: 'Circular Economy', icon: Recycle },
    { id: 'environmental', label: 'Environmental Protection', icon: HeartPulse },
  ];

  const sdgs = [
    {
      number: 1,
      title: 'No Poverty',
      color: '#e5243b',
      category: 'social',
      description: 'Assuring regular, fair income and banking access to local waste collectors (Safai Sathis), lifting families out of poverty.',
    },
    {
      number: 3,
      title: 'Good Health & Well-being',
      color: '#4c9f38',
      category: 'environmental',
      description: 'Reducing exposure to toxic substances and waste-borne pathogens through organized collection and health camps.',
    },
    {
      number: 5,
      title: 'Gender Equality',
      color: '#ff3a21',
      category: 'social',
      description: 'Empowering women waste collectors with financial literacy, leadership training, and equal pay structures.',
    },
    {
      number: 6,
      title: 'Clean Water & Sanitation',
      color: '#26bde2',
      category: 'environmental',
      description: 'Preventing waste runoff from polluting local rivers, drains, and groundwater tables through clean-up drives.',
    },
    {
      number: 7,
      title: 'Affordable & Clean Energy',
      color: '#fcc30b',
      category: 'circular',
      description: 'Processing wet organic waste into biogas and renewable bio-CNG to fuel clean energy alternatives.',
    },
    {
      number: 8,
      title: 'Decent Work & Economic Growth',
      color: '#a21942',
      category: 'social',
      description: 'Integrating unorganized waste workers into formal systems, providing safety gear, insurance, and dignity.',
    },
    {
      number: 9,
      title: 'Industry, Innovation & Infra',
      color: '#fd6925',
      category: 'circular',
      description: 'Developing decentralized Material Recovery Facilities (MRFs) with smart segregation technologies.',
    },
    {
      number: 10,
      title: 'Reduced Inequalities',
      color: '#dd1367',
      category: 'social',
      description: 'Eradicating social stigma surrounding waste work by ensuring social security and digital identification cards.',
    },
    {
      number: 11,
      title: 'Sustainable Cities & Communities',
      color: '#fd9d24',
      category: 'circular',
      description: 'Building zero-waste cities by assisting Municipal Corporations in establishing end-to-end segregation.',
    },
    {
      number: 12,
      title: 'Responsible Consumption & Production',
      color: '#bf8b2e',
      category: 'circular',
      description: 'Advancing circular loops by ensuring dry waste gets scientifically recycled and returned to the supply chain.',
    },
    {
      number: 13,
      title: 'Climate Action',
      color: '#3f7e44',
      category: 'environmental',
      description: 'Reducing greenhouse gas emissions (Methane) by diverting organic waste away from open dumps/landfills.',
    },
    {
      number: 14,
      title: 'Life Below Water',
      color: '#0a97d9',
      category: 'environmental',
      description: 'Stopping marine litter and plastic waste at source in coastal regions and river basins.',
    },
    {
      number: 15,
      title: 'Life on Land',
      color: '#56c02b',
      category: 'environmental',
      description: 'Eliminating illegal dump yards in protected forest areas and national parks to safeguard biodiversity.',
    },
    {
      number: 17,
      title: 'Partnerships for the Goals',
      color: '#19486a',
      category: 'social',
      description: 'Fostering collaborations across ULBs, PRIs, corporate sponsors, and resident welfare associations.',
    },
  ];

  const filteredSdgs = activeCategory === 'all' 
    ? sdgs 
    : sdgs.filter(item => item.category === activeCategory);

  return (
    <div className="sdg-section">
      {/* Category selector tabs */}
      <div className="category-tabs">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSdg(null);
              }}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="sdg-explorer-layout">
        {/* SDG Grid */}
        <div className="sdg-grid">
          {filteredSdgs.map((sdg) => (
            <button
              key={sdg.number}
              className={`sdg-card ${selectedSdg?.number === sdg.number ? 'active' : ''}`}
              onClick={() => setSelectedSdg(sdg)}
              style={{ '--sdg-color': sdg.color }}
            >
              <div className="sdg-number">{sdg.number}</div>
              <div className="sdg-title">{sdg.title}</div>
              <div className="sdg-badge-accent" style={{ backgroundColor: sdg.color }} />
            </button>
          ))}
        </div>

        {/* SDG Detail Panel */}
        <div className="sdg-detail-panel card glass-panel">
          {selectedSdg ? (
            <div className="sdg-detail-content">
              <div className="detail-header" style={{ '--sdg-color': selectedSdg.color }}>
                <div className="detail-number">{selectedSdg.number}</div>
                <div>
                  <span className="goal-sub">Sustainable Development Goal</span>
                  <h3>{selectedSdg.title}</h3>
                </div>
              </div>
              
              <div className="connection-card">
                <h4>Uboontu Connection:</h4>
                <p>{selectedSdg.description}</p>
              </div>

              <div className="detail-footer">
                <a 
                  href={`https://sdgs.un.org/goals/goal${selectedSdg.number}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="sdg-un-link"
                >
                  Read official Goal {selectedSdg.number} targets <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ) : (
            <div className="sdg-placeholder flex-center">
              <div className="placeholder-text">
                <HelpCircle size={48} className="placeholder-icon animate-float" />
                <h3>Select an SDG</h3>
                <p>Click on any of our 14 aligned Sustainable Development Goals to see how Uboontu Foundation drives measurable change.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sdg-section {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .category-tabs {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
        }

        .category-tab.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 4px 10px rgba(59, 184, 82, 0.25);
        }

        .sdg-explorer-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        .sdg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 1rem;
        }

        .sdg-card {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .sdg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.1);
          border-color: var(--sdg-color);
        }

        .sdg-card.active {
          border-color: var(--sdg-color);
          background-color: var(--bg-tertiary);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
        }

        .sdg-number {
          font-family: var(--font-headings);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-muted);
          line-height: 1;
          transition: color var(--transition-fast);
        }

        .sdg-card:hover .sdg-number,
        .sdg-card.active .sdg-number {
          color: var(--sdg-color);
        }

        .sdg-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .sdg-badge-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
        }

        /* Detail Panel */
        .sdg-detail-panel {
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sdg-detail-content {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          height: 100%;
          justify-content: space-between;
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .detail-number {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background-color: var(--sdg-color);
          color: white;
          font-family: var(--font-headings);
          font-size: 2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .goal-sub {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .detail-header h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .connection-card {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .connection-card h4 {
          font-size: 0.95rem;
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .connection-card p {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .sdg-un-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .sdg-un-link:hover {
          color: var(--primary-hover);
        }

        .placeholder-text {
          text-align: center;
          max-width: 320px;
          color: var(--text-muted);
        }

        .placeholder-icon {
          color: var(--primary);
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }

        .placeholder-text h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .placeholder-text p {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 992px) {
          .sdg-explorer-layout {
            grid-template-columns: 1fr;
          }
          .sdg-detail-panel {
            min-height: auto;
          }
        }

        @media (max-width: 576px) {
          .sdg-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }
          .sdg-card {
            padding: 0.85rem;
          }
          .sdg-number {
            font-size: 1.75rem;
          }
          .sdg-title {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
