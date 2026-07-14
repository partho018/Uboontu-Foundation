'use client';

import { useState } from 'react';
import { ShieldAlert, Compass, Globe, Home, X, ArrowRight, Check } from 'lucide-react';

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 'zerowaste',
      title: 'ZeroWaste Mission',
      tag: 'Circular Economy',
      icon: Globe,
      color: '#3BB852',
      bgLight: 'rgba(59, 184, 82, 0.1)',
      shortDesc: 'Establishing institutional frameworks to divert up to 98% of waste from municipal dumpsites.',
      fullDesc: 'The ZeroWaste Mission is Uboontu\'s flagship corporate and industrial circularity model. We audit, design, and manage complete material flows within campuses, factories, and tech parks. By separating materials into 48 distinct categories at the point of origin, we ensure minimal downcycling and maximal resource restoration.',
      highlights: [
        '98%+ waste diversion certification achieved for 12 corporate hubs',
        'Decentralized organic digesters producing organic soil conditioners on-site',
        'Traceable supply chains for plastic, paper, e-waste, and metal fractions',
        'Direct links to authorized green recyclers with automated ESG reporting'
      ],
      impact: '3,200+ Tons diverted annually'
    },
    {
      id: 'community',
      title: 'Community Development',
      tag: 'Social Upliftment',
      icon: Home,
      color: '#0d9488',
      bgLight: 'rgba(13, 148, 136, 0.1)',
      shortDesc: 'Organizing and empowering informal waste collectors (Safai Sathis) with fair wages and social security.',
      fullDesc: 'Our Human-Centric approach focuses on the backbone of the waste system: the informal waste pickers. We integrate these individuals into official municipal programs, providing secure livelihoods, direct bank deposits, health checks, personal protective equipment, and formal identification cards.',
      highlights: [
        '1,200+ Safai Sathis registered, insured, and formally integrated',
        'Financial inclusion workshops leading to 100% bank-account ownership',
        'Educational scholarships provided for children of waste collectors',
        'Eradication of child labor through organized day-care centers'
      ],
      impact: '2.5x Increase in average collector household income'
    },
    {
      id: 'tourism',
      title: 'Responsible Tourism',
      tag: 'Biodiversity Protection',
      icon: Compass,
      color: '#d97706',
      bgLight: 'rgba(217, 119, 6, 0.1)',
      shortDesc: 'Setting up waste processing facilities in sensitive tourist corridors and national parks.',
      fullDesc: 'Unchecked tourism leads to severe degradation of natural habitats. Uboontu designs low-impact, specialized Material Recovery Facilities (MRFs) operating inside protected areas, national parks, and mountain sanctuaries. We work with local hospitality networks to monitor and recover plastics before they enter natural ecosystems.',
      highlights: [
        'First MRF setup inside Tiger Reserves and National Parks',
        'Diverting plastic waste from critical river basins and forest floors',
        'Interactive trash bins coupled with visitor awareness campaigns',
        'Partnerships with 120+ hotels and lodges to implement zero-single-use guidelines'
      ],
      impact: '150+ Forest acres kept plastic-free'
    },
    {
      id: 'villages',
      title: 'Zero Waste Villages',
      tag: 'Rural Development',
      icon: ShieldAlert,
      color: '#3b82f6',
      bgLight: 'rgba(59, 130, 246, 0.1)',
      shortDesc: 'Decentralized rural waste management setups in partnership with Gram Panchayats.',
      fullDesc: 'Rural waste systems are heavily underserved, leading to wide-scale plastic burning. Uboontu partners with PRIs (Panchayati Raj Institutions) to build zero-waste villages. We implement domestic waste segregation, run local wet waste composting yards, and create self-sustaining collection schedules operated by rural women self-help groups (SHGs).',
      highlights: [
        '68 Gram Panchayats declared clean and plastic-burning free',
        'Decentralized composting yards supplying organic manure to local farmers',
        'Job creation for over 350 rural women through waste management cooperatives',
        'Regular school engagement workshops teaching sustainable segregation habits'
      ],
      impact: '120,000+ Rural residents served'
    }
  ];

  return (
    <div className="projects-section">
      <div className="projects-grid">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div key={proj.id} className="project-card card" style={{ '--accent-color': proj.color }}>
              <div className="project-header">
                <span className="project-tag" style={{ backgroundColor: proj.bgLight, color: proj.color }}>
                  {proj.tag}
                </span>
                <div className="project-icon-wrapper" style={{ backgroundColor: proj.bgLight, color: proj.color }}>
                  <Icon size={20} />
                </div>
              </div>
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.shortDesc}</p>
              
              <div className="project-footer">
                <span className="project-impact-metric">{proj.impact}</span>
                <button className="read-more-btn" onClick={() => setActiveProject(proj)}>
                  Explore Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal Popup */}
      {activeProject && (
        <div className="project-modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="project-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveProject(null)} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-body">
              <span className="project-tag modal-tag" style={{ backgroundColor: activeProject.bgLight, color: activeProject.color }}>
                {activeProject.tag}
              </span>
              
              <h2 className="modal-title">{activeProject.title}</h2>
              <p className="modal-description">{activeProject.fullDesc}</p>

              <div className="modal-highlights">
                <h3>Key Milestones:</h3>
                <ul>
                  {activeProject.highlights.map((highlight, i) => (
                    <li key={i}>
                      <span className="check-icon-wrapper" style={{ backgroundColor: activeProject.bgLight, color: activeProject.color }}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer" style={{ borderTop: `1px solid var(--border-color)` }}>
                <div>
                  <span className="impact-label">Verified Impact:</span>
                  <div className="impact-val" style={{ color: activeProject.color }}>{activeProject.impact}</div>
                </div>
                <button className="btn btn-primary" onClick={() => setActiveProject(null)}>
                  Close Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 320px;
        }

        .project-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .project-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
        }

        .project-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-title {
          font-size: 1.35rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .project-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 1.25rem;
        }

        .project-impact-metric {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .read-more-btn {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-color);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .read-more-btn:hover {
          color: var(--text-primary);
        }

        /* Detail Modal */
        .project-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 15, 11, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2100;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease-out;
        }

        .project-modal-content {
          border-radius: var(--radius-lg);
          padding: 3.5rem;
          width: 100%;
          max-width: 650px;
          position: relative;
          color: var(--text-primary);
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: var(--border-color);
          transform: rotate(90deg);
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modal-tag {
          align-self: flex-start;
        }

        .modal-title {
          font-size: 2.25rem;
          color: var(--text-primary);
        }

        .modal-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .modal-highlights {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-highlights h3 {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .modal-highlights ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .modal-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .check-icon-wrapper {
          width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          margin-top: 1rem;
        }

        .impact-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .impact-val {
          font-size: 1.25rem;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .project-modal-content {
            padding: 2.5rem;
          }
          .modal-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
