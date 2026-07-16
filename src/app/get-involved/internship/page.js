'use client';

import { useState } from 'react';
import { Award, CheckCircle2, Send, Clock, Briefcase } from 'lucide-react';

export default function InternshipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    duration: '3-months',
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
      education: '',
      duration: '3-months',
      resumeLink: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <main className="get-involved-page internship-page">
      {/* Background Decorative Elements */}
      <div className="gi-bg-decorations">
        <div className="bg-orb orb-internship-1"></div>
        <div className="bg-orb orb-internship-2"></div>
        <div className="bg-grid-overlay"></div>
        <div className="shapes-container">
          <div className="edu-shape es-1"></div>
          <div className="edu-shape es-2"></div>
          <div className="edu-shape es-3"></div>
          <div className="edu-shape es-4"></div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="about-hero internship-hero">
        <div className="container">
          <div className="about-hero-grid internship-hero-grid">
            
            {/* Text Content Column */}
            <div className="about-hero-content scroll-reveal reveal-fade-right duration-slow">
              <span className="about-eyebrow">
                <Award size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Internship
              </span>
              <h1 className="about-title">
                Internship <span className="elegant-serif text-gradient">Opportunities</span>
              </h1>
              <p className="about-desc-lead">
                Work on real-world environmental sustainability and waste management initiatives to advance your professional skills.
              </p>
              <p className="about-desc-body">
                Our structured internships provide students and young professionals a direct avenue to conduct ground-level research, manage waste collection pilots, engage in community outreach, and understand environmental policy implementations. We offer mentorship, certificates, and potential career opportunities.
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
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                    alt="Internship Opportunities - Collaborative Learning" 
                    className="gi-main-img"
                  />
                </div>
                
                {/* Sub Image */}
                <div className="gi-sub-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=400&q=80" 
                    alt="Uboontu Fieldwork Research" 
                    className="gi-sub-img"
                  />
                </div>

                {/* Floating Metric 1 */}
                <div className="floating-metric gi-metric-1">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                    <Clock size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">3 Months</span>
                    <span className="metric-lbl">Program Duration</span>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="floating-metric gi-metric-2">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(59, 184, 82, 0.15)', color: 'var(--primary)' }}>
                    <Award size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">Certificate</span>
                    <span className="metric-lbl">And Mentorship</span>
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
                  <h2>Internship <span className="elegant-serif">Application</span></h2>
                  <p>Apply for a structured, hands-on sustainability internship program.</p>
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
                      <label htmlFor="duration">Internship Duration</label>
                      <select 
                        id="duration" 
                        name="duration" 
                        value={formData.duration} 
                        onChange={handleChange}
                        className="gi-select"
                      >
                        <option value="1-month">1 Month (Introductory)</option>
                        <option value="3-months">3 Months (Standard Program)</option>
                        <option value="6-months">6 Months (Comprehensive Research)</option>
                      </select>
                    </div>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="education">Current University / Degree Major</label>
                    <input 
                      type="text" 
                      id="education" 
                      name="education" 
                      required 
                      value={formData.education} 
                      onChange={handleChange}
                      className="gi-input" 
                      placeholder="e.g. B.Sc. Environmental Science, MBA, etc."
                    />
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="resumeLink">Resume Link (Google Drive / LinkedIn / Dropbox)</label>
                    <input 
                      type="url" 
                      id="resumeLink" 
                      name="resumeLink" 
                      required 
                      value={formData.resumeLink} 
                      onChange={handleChange}
                      className="gi-input" 
                      placeholder="https://drive.google.com/... (Make link public)"
                    />
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="message">Why should we select you?</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={4} 
                      value={formData.message} 
                      onChange={handleChange}
                      className="gi-textarea" 
                      placeholder="Briefly tell us how this internship relates to your future career goals..."
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
                <h3>Application Submitted</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your internship application has been recorded. Our educational outreach team will review your resume and contact you if your profile aligns with our upcoming cohorts.
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
