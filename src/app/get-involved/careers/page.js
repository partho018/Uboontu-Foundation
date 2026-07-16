'use client';

import { useState } from 'react';
import { Briefcase, CheckCircle2, Send, Users } from 'lucide-react';

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'operations',
    resumeLink: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'operations',
      resumeLink: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <main className="get-involved-page careers-page">
      {/* Background Decorative Elements */}
      <div className="gi-bg-decorations">
        <div className="bg-orb orb-careers-1"></div>
        <div className="bg-orb orb-careers-2"></div>
        <div className="bg-grid-overlay"></div>
        <div className="career-paths">
          <div className="career-path cp-1"></div>
          <div className="career-path cp-2"></div>
          <div className="career-path cp-3"></div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="about-hero careers-hero">
        <div className="container">
          <div className="about-hero-grid careers-hero-grid">
            
            {/* Text Content Column */}
            <div className="about-hero-content scroll-reveal reveal-fade-right duration-slow">
              <span className="about-eyebrow">
                <Briefcase size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Careers
              </span>
              <h1 className="about-title">
                Work With <span className="elegant-serif text-gradient">Us</span>
              </h1>
              <p className="about-desc-lead">
                Join a team of dedicated professionals and create measurable environmental and social impact on-ground.
              </p>
              <p className="about-desc-body">
                We are always on the lookout for dedicated professionals in operations, field education, community mobilization, waste engineering, and communication. Work in an environment that values continuous learning, shared success, and measurable social impact.
              </p>
              <div className="hero-cta-buttons">
                <button 
                  onClick={() => document.querySelector('.gi-form-section')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="btn btn-primary"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Visual Image Column (Staggered Stack) */}
            <div className="gi-hero-visual-stack scroll-reveal reveal-fade-left duration-slow">
              <div className="gi-stack-container">
                
                {/* Main Image */}
                <div className="gi-main-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Work With Us - Careers at Uboontu" 
                    className="gi-main-img"
                  />
                </div>
                
                {/* Sub Image */}
                <div className="gi-sub-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80" 
                    alt="Uboontu Fieldwork" 
                    className="gi-sub-img"
                  />
                </div>

                {/* Floating Metric 1 */}
                <div className="floating-metric gi-metric-1">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(132, 204, 22, 0.15)', color: '#84cc16' }}>
                    <Briefcase size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">5+ Roles</span>
                    <span className="metric-lbl">Open Positions</span>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="floating-metric gi-metric-2">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(59, 184, 82, 0.15)', color: 'var(--primary)' }}>
                    <Users size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">Growth</span>
                    <span className="metric-lbl">Career Path</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="gi-form-section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="gi-form-container scroll-reveal reveal-fade-up">
            {!submitted ? (
              <>
                <div className="gi-form-header">
                  <h2>Job Application <span className="elegant-serif">Form</span></h2>
                  <p>Apply for open roles or submit your profile to our talent pool.</p>
                </div>
                
                <form className="gi-form" onSubmit={handleSubmit}>
                  <div className="gi-form-row">
                    <div className="gi-form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="gi-form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="gi-form-row">
                    <div className="gi-form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange}
                        className="gi-input" 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="gi-form-group">
                      <label htmlFor="role">Role of Interest</label>
                      <select 
                        id="role" 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange}
                        className="gi-select"
                      >
                        <option value="operations">Operations Manager / Assistant</option>
                        <option value="field-officer">Field Environmental Officer</option>
                        <option value="advocacy">Education & Training Coordinator</option>
                        <option value="general">General Application / Talent Pool</option>
                      </select>
                    </div>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="resumeLink">Resume / LinkedIn Profile Link</label>
                    <input 
                      type="url" 
                      id="resumeLink" 
                      name="resumeLink" 
                      required 
                      value={formData.resumeLink} 
                      onChange={handleChange}
                      className="gi-input" 
                      placeholder="https://linkedin.com/in/... or drive link"
                    />
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="message">Cover Letter / Statement of Suitability</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={5} 
                      value={formData.message} 
                      onChange={handleChange}
                      className="gi-textarea" 
                      placeholder="Explain why you are qualified for this role and why you want to work with Uboontu..."
                    />
                  </div>

                  <button type="submit" className="gi-submit-btn">
                    Submit Application <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="gi-success-state">
                <div className="gi-success-icon">
                  <CheckCircle2 size={40} />
                </div>
                <h3>Application Received</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your career application has been recorded. Our Human Resources department will review your credentials and get back to you if there is an active match.
                </p>
                <button className="gi-reset-btn" onClick={handleReset}>
                  Submit Another Application
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
