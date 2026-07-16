import { Briefcase, Leaf } from 'lucide-react';
import ExpandableCard from '../about/ExpandableCard';

export const metadata = {
  title: 'Our Work | Uboontu Foundation',
  description: 'Explore Uboontu Foundation\'s projects, programs, and initiatives across waste management, circular economy, and community development.',
};

const projectsList = [
  {
    title: "Manbhar",
    imageSrc: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    shortText: "Project Manbhar is a community-based solid waste management initiative implemented by Uboontu Foundation to promote cleanliness, waste segregation, recycling, and sustainable environmental practices in rural and underserved communities.",
    fullText: " The project focuses on improving sanitation systems, encouraging behavioural change, and creating long-term environmental and social impact through active community participation."
  },
  {
    title: "Zero Waste Apartments – SWM ‘26",
    imageSrc: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    shortText: "Door-to-door waste collection, source segregation, Material Recovery Facilities (MRFs), composting, and decentralized waste processing systems, there by developing zero waste to landfill."
  },
  {
    title: "Bulk Waste Generator (BWG) Management",
    imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    shortText: "End-to-end waste management support for apartments, institutions, commercial complexes, and gated communities."
  },
  {
    title: "Recycling & Circular Economy",
    imageSrc: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80",
    shortText: "Plastic recovery, dry waste sorting, recycling partnerships, and responsible resource management."
  },
  {
    title: "Environmental Education",
    imageSrc: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
    shortText: "School awareness programs, eco-clubs, sustainability workshops, and behavior change campaigns."
  },
  {
    title: "Community Development",
    imageSrc: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80",
    shortText: "Working with slum communities, villages, women groups, and youth to build sustainable environmental practices."
  },
  {
    title: "Climate & Sustainability Initiatives",
    imageSrc: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
    shortText: "Tree plantation drives, biodiversity conservation, clean-up campaigns, and SDG-focused interventions."
  }
];

export default function OurWorkPage() {
  return (
    <main className="our-work-page">
      {/* Hero Section */}
      <section className="our-work-hero">
        {/* Background Decorative Elements */}
        <div className="hero-bg-decorations">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-orb orb-3"></div>
          <div className="bg-grid-overlay"></div>
          
          <div className="floating-leaf leaf-1" style={{ '--rot': '15deg' }}>
            <Leaf size={48} strokeWidth={1.5} />
          </div>
          <div className="floating-leaf leaf-2" style={{ '--rot': '-25deg' }}>
            <Leaf size={36} strokeWidth={1.5} />
          </div>
          <div className="floating-leaf leaf-3" style={{ '--rot': '45deg' }}>
            <Leaf size={40} strokeWidth={1.5} />
          </div>
          <div className="floating-leaf leaf-4" style={{ '--rot': '-10deg' }}>
            <Leaf size={32} strokeWidth={1.5} />
          </div>
        </div>

        <div className="container">
          <div className="our-work-hero-grid">
            
            {/* Text Content Column */}
            <div className="our-work-hero-content scroll-reveal reveal-fade-right duration-slow">
              <span className="our-work-eyebrow">
                <Briefcase size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Our Impact
              </span>
              <h1 className="our-work-title">
                Our <span className="elegant-serif text-gradient">Work</span>
              </h1>
              <h3 className="our-work-subtitle">Driving Sustainable Change Through Action</h3>
              <p className="our-work-desc">
                At Uboontu Foundation, we work towards building cleaner, healthier, and more sustainable communities through practical environmental solutions and community-driven initiatives. Our projects focus on waste management, environmental awareness, circular economy practices, and climate-conscious community development.
              </p>
              <div className="hero-cta-buttons">
                <a href="#projects" className="btn btn-primary">Explore Projects</a>
                <a href="/get-involved/volunteer" className="btn btn-secondary">Join Us</a>
              </div>
            </div>

            {/* Visual Image Column */}
            <div className="our-work-hero-visual scroll-reveal reveal-fade-left duration-slow">
              <div className="hero-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80" 
                  alt="Uboontu Foundation Environmental Work" 
                  className="our-work-hero-img"
                />
                
                {/* Floating Metric 1 */}
                <div className="floating-metric metric-1">
                  <div className="metric-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">100%</span>
                    <span className="metric-lbl">Direct Impact</span>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="floating-metric metric-2">
                  <div className="metric-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">15,000+</span>
                    <span className="metric-lbl">Lives Enriched</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="work-projects-section" id="projects">
        {/* Background Decorative Elements */}
        <div className="hero-bg-decorations">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-orb orb-3"></div>
          <div className="bg-grid-overlay"></div>
          
          <div className="floating-leaf leaf-1" style={{ '--rot': '35deg' }}>
            <Leaf size={48} strokeWidth={1.5} />
          </div>
          <div className="floating-leaf leaf-2" style={{ '--rot': '-15deg' }}>
            <Leaf size={36} strokeWidth={1.5} />
          </div>
          <div className="floating-leaf leaf-3" style={{ '--rot': '55deg' }}>
            <Leaf size={40} strokeWidth={1.5} />
          </div>
          <div className="floating-leaf leaf-4" style={{ '--rot': '-20deg' }}>
            <Leaf size={32} strokeWidth={1.5} />
          </div>
        </div>

        <div className="container">
          <div className="projects-container">
            {/* Header */}
            <div className="work-projects-header scroll-reveal reveal-fade-up">
              <h2><span className="elegant-serif">Projects</span></h2>
              <p>Explore the active campaigns, on-ground implementations, and circular initiatives that make up our green mission.</p>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {projectsList.map((project, index) => {
                const slug = project.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)+/g, '');
                return (
                  <div 
                    key={index} 
                    id={slug}
                    className={`scroll-reveal reveal-fade-up delay-${((index % 3) + 1) * 100}`}
                  >
                    <ExpandableCard 
                      title={project.title}
                      imageSrc={project.imageSrc}
                      shortText={project.shortText}
                      fullText={project.fullText}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
