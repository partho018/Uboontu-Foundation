import { Eye, Target, Trophy, Award } from 'lucide-react';
import ExpandableCard from './ExpandableCard';
import AwardsCarousel from './AwardsCarousel';

export const metadata = {
  title: 'About Us | Uboontu Foundation',
  description: 'Learn about Uboontu Foundation\'s mission, vision, team, and journey towards sustainable waste management.',
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero Section / Who We Are */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80" 
            alt="Uboontu Foundation - Who We Are" 
            className="about-hero-img"
          />
        </div>
        <div className="container">
          <div className="about-hero-content scroll-reveal reveal-fade-right duration-slow">
            <h1 className="about-title">Who We <span className="elegant-serif">Are</span></h1>
            <p className="about-desc-lead">
              Uboontu Foundation is committed to creating environmentally responsible communities through practical and scalable sustainability solutions. Our work focuses on solid waste management, behavior change communication, recycling systems, biodiversity restoration, and climate action initiatives.
            </p>
            <p className="about-desc-body">
              For the last several years, we have been actively implementing waste management projects across residential colonies, institutions, villages, slum communities, commercial establishments, and government spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="container">
          <div className="vm-grid">
            {/* Vision */}
            <div className="vm-card scroll-reveal reveal-fade-right">
              <div className="vm-card-header">
                <div className="vm-icon-box">
                  <Eye size={24} />
                </div>
                <h3>Vision</h3>
              </div>
              <p className="vm-card-body">
                To create a healthy environment for all by promoting a circular economy and sustainable living.
              </p>
              <div className="vm-image-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80" 
                  alt="Uboontu Foundation Vision" 
                />
              </div>
            </div>

            {/* Mission */}
            <div className="vm-card scroll-reveal reveal-fade-left delay-200">
              <div className="vm-card-header">
                <div className="vm-icon-box">
                  <Target size={24} />
                </div>
                <h3>Mission</h3>
              </div>
              <p className="vm-card-body">
                A world where sustainability is a shared way of life — powered by circular economy, dignity, and collective action.
              </p>
              <div className="vm-image-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" 
                  alt="Uboontu Foundation Mission" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview / Summary Section */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header scroll-reveal reveal-fade-up">
            <h2><span className="elegant-serif">Projects</span></h2>
            <p>
              Starting our journey in Delhi, we are now implementing projects across multiple cities, including Delhi, Noida, Gurugram, and Ranthambore, among others. Our strategically diversified geographic presence acts as a safeguard, reducing risks linked to regional dependencies and ensuring resilience against fluctuations arising from concentrated operations in limited areas.
            </p>
          </div>
          <div className="projects-grid">
            <div className="scroll-reveal reveal-fade-up delay-100">
              <ExpandableCard 
                title="Manbhar"
                imageSrc="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80"
                shortText="Project Manbhar is a community-based solid waste management initiative implemented by Uboontu Foundation to promote cleanliness, waste segregation, recycling, and sustainable environmental practices in rural and underserved communities."
                fullText=" The project focuses on improving sanitation systems, encouraging behavioural change, and creating long-term environmental and social impact through active community participation."
              />
            </div>
            
            <div className="scroll-reveal reveal-fade-up delay-200">
              <ExpandableCard 
                title="Zero Waste Apartments – SWM ‘26"
                imageSrc="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                shortText="Door-to-door waste collection, source segregation, Material Recovery Facilities (MRFs), composting, and decentralized waste processing systems, there by developing zero waste to landfill."
              />
            </div>

            <div className="scroll-reveal reveal-fade-up delay-300">
              <ExpandableCard 
                title="Bulk Waste Generator (BWG) Management"
                imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                shortText="End-to-end waste management support for apartments, institutions, commercial complexes, and gated communities."
              />
            </div>

            <div className="scroll-reveal reveal-fade-up delay-400">
              <ExpandableCard 
                title="Recycling & Circular Economy"
                imageSrc="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80"
                shortText="Plastic recovery, dry waste sorting, recycling partnerships, and responsible resource management."
              />
            </div>

            <div className="scroll-reveal reveal-fade-up delay-100">
              <ExpandableCard 
                title="Environmental Education"
                imageSrc="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
                shortText="School awareness programs, eco-clubs, sustainability workshops, and behavior change campaigns."
              />
            </div>

            <div className="scroll-reveal reveal-fade-up delay-200">
              <ExpandableCard 
                title="Community Development"
                imageSrc="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80"
                shortText="Working with slum communities, villages, women groups, and youth to build sustainable environmental practices."
              />
            </div>

            <div className="scroll-reveal reveal-fade-up delay-300">
              <ExpandableCard 
                title="Climate & Sustainability Initiatives"
                imageSrc="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80"
                shortText="Tree plantation drives, biodiversity conservation, clean-up campaigns, and SDG-focused interventions."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <section className="awards-section">
        <div className="container">
          <div className="section-header scroll-reveal reveal-fade-up">
            <span className="badge badge-accent">Awards & Recognitions</span>
            <h2>Our <span className="elegant-serif">Achievements</span></h2>
          </div>
          
          <div className="awards-layout">
            <div className="awards-image-wrapper scroll-reveal reveal-fade-right">
              <AwardsCarousel />
            </div>

            <div className="awards-list">
              {/* Award 1 */}
              <div className="award-card glass-panel scroll-reveal reveal-fade-left delay-100">
                <div className="award-card-header">
                  <span className="award-badge">Indian CSR Award 2025</span>
                  <div className="award-icon-wrap">
                    <Trophy size={20} />
                  </div>
                </div>
                <h4>Best Sustainable Bulk Waste Management Initiative</h4>
                <p>
                  We are proud to share that Uboontu was honoured with the Indian CSR Award for Best Sustainable Bulk Waste Management Initiative of the Year 2025, for our initiatives in BWG Management Initiatives in Delhi NCR.
                </p>
              </div>

              {/* Award 2 */}
              <div className="award-card glass-panel scroll-reveal reveal-fade-left delay-300">
                <div className="award-card-header">
                  <span className="award-badge">ImpactRoots Award 2026</span>
                  <div className="award-icon-wrap">
                    <Award size={20} />
                  </div>
                </div>
                <h4>Environmental Sustainability Initiative Award</h4>
                <p>
                  We are proud to share that we received the Environmental Sustainability Initiative Award at the ImpactRoots India CSR Summit & Awards Series 2026 held on 22 January 2026 in New Delhi. This recognition inspires our team to strengthen our on-ground efforts and expand our impact in the coming year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
