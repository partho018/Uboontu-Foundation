'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, User, Building, Landmark, Compass } from 'lucide-react';

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('municipal');
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs = [
    { id: 'municipal', label: 'Municipal Corporations', icon: Landmark },
    { id: 'bwg', label: 'Bulk Waste Generators', icon: Building },
    { id: 'individual', label: 'Individuals', icon: User },
    { id: 'pri', label: 'PRIs (Panchayats)', icon: Compass },
  ];

  const testimonialData = {
    municipal: [
      {
        quote: "Uboontu's structured intervention in our dry waste management has streamlined segregation, saving our landfill space by thousands of metric tons. Their digital monitoring and tracking systems provide high accountability.",
        author: "Dr. K. Srinivas",
        role: "Deputy Commissioner (Solid Waste Management)",
        org: "City Municipal Corporation",
      },
      {
        quote: "We partnered with Uboontu Foundation for capacity building programs. Their trainers are on-ground experts who speak the local language and understand local realities. The transformation has been remarkable.",
        author: "Meera Deshmukh",
        role: "Chief Health Officer",
        org: "Municipal Council (Urban Health division)",
      }
    ],
    bwg: [
      {
        quote: "As a commercial hub producing 2+ tons of waste daily, finding a compliant partner was crucial. Uboontu set up an end-to-end wet waste composting facility on-site. We are now a certified Zero-Waste Campus.",
        author: "Rajesh Varma",
        role: "VP of Facility Operations",
        org: "TechParks Global India Ltd.",
      },
      {
        quote: "Uboontu helped us implement a complete circular loop in our residential complex of 800 flats. 100% of our wet waste is processed into high-grade compost, which we now use for our gardens.",
        author: "Anil K. Mehta",
        role: "President",
        org: "Green Meadows Housing RWA",
      }
    ],
    individual: [
      {
        quote: "The Safai Sathi program changed my life. I used to work in unsafe conditions with irregular earnings. With Uboontu, I have safety gear, monthly bank transfers, health insurance, and above all, dignity in my work.",
        author: "Ramesh Kannan",
        role: "Lead Collector (Safai Sathi)",
        org: "Uboontu Bangalore MRF",
      },
      {
        quote: "Learning about compost making and household segregation in Uboontu's workshops opened my eyes. I have reduced my single-use plastic waste to nearly zero. Every household must join this movement.",
        author: "Priya Sundar",
        role: "Active Citizen & Volunteer",
        org: "Eco-Ambassadors Network",
      }
    ],
    pri: [
      {
        quote: "Our village panchayat was struggling with plastic burning. Uboontu partnered with us to establish the Zero-Waste Village model. They set up segregated collection bins and created local jobs for women self-help groups.",
        author: "Sarpanch Laxmi Bai",
        role: "Gram Panchayat Leader",
        org: "Uboontu Zero Waste Village Initiative",
      },
      {
        quote: "Fostering partnerships at the block level has been Uboontu's strength. They connected us to state level recyclers and set up collection hubs that serve 7 neighboring villages. This is rural circular economy in action.",
        author: "Dinesh Kumar",
        role: "Panchayat Secretary",
        org: "PRIs Sustainability Circle",
      }
    ]
  };

  const currentSlides = testimonialData[activeTab];
  const totalSlides = currentSlides.length;

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentTestimonial = currentSlides[slideIndex];

  return (
    <div className="testimonials-container">
      {/* Category Tabs */}
      <div className="testimonials-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSlideIndex(0);
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Slider Area */}
      <div className="slider-wrapper card glass-panel">
        <div className="quote-icon-bg">
          <Quote size={120} />
        </div>

        <div className="slide-content">
          <Quote className="quote-icon" size={32} />
          
          <blockquote className="testimonial-quote">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          <div className="testimonial-author">
            <div className="author-avatar">
              {currentTestimonial.author[0]}
            </div>
            <div>
              <cite className="author-name">{currentTestimonial.author}</cite>
              <p className="author-role">{currentTestimonial.role}</p>
              <p className="author-org">{currentTestimonial.org}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        {totalSlides > 1 && (
          <div className="slider-controls">
            <button className="control-btn" onClick={prevSlide} aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <span className="slide-indicator">
              {slideIndex + 1} / {totalSlides}
            </span>
            <button className="control-btn" onClick={nextSlide} aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .testimonials-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .testimonials-tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .tab-btn.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 4px 10px rgba(59, 184, 82, 0.25);
        }

        .slider-wrapper {
          position: relative;
          padding: 4rem;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .quote-icon-bg {
          position: absolute;
          top: 1rem;
          right: 2rem;
          color: var(--primary);
          opacity: 0.04;
          pointer-events: none;
        }

        .slide-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .quote-icon {
          color: var(--primary);
          opacity: 0.7;
        }

        .testimonial-quote {
          font-size: 1.25rem;
          line-height: 1.75;
          font-style: italic;
          color: var(--text-primary);
          font-weight: 500;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          font-family: var(--font-headings);
          font-size: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .author-name {
          font-style: normal;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .author-role {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .author-org {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
        }

        .slider-controls {
          position: absolute;
          bottom: 2rem;
          right: 4rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .control-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .control-btn:hover {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .slide-indicator {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .slider-wrapper {
            padding: 2.5rem;
          }
          .slider-controls {
            position: static;
            margin-top: 2rem;
            justify-content: flex-end;
          }
          .testimonial-quote {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
