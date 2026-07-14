'use client';

import { useState } from 'react';
import { Briefcase, CheckCircle2, Send } from 'lucide-react';

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
    <main className="get-involved-page">
      {/* Content Section */}
      <section className="gi-split-section">
        <div className="container gi-split-container">
          <div className="gi-split-grid scroll-reveal reveal-fade-up">
            <div className="gi-split-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Work With Us - Careers at Uboontu" 
              />
            </div>
            <div className="gi-split-content">
              <span className="gi-eyebrow" style={{ alignSelf: 'flex-start' }}>
                <Briefcase size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Careers
              </span>
              <h1 className="gi-split-title">Work With Us</h1>
              <p className="gi-split-subtitle">
                Join a team of dedicated professionals and create measurable environmental and social impact on-ground.
              </p>
              <div className="gi-split-divider" />
              <p className="gi-split-desc-lead">
                Join our team and contribute towards building sustainable communities through impactful environmental action.
              </p>
              <p className="gi-split-desc-body">
                We are always on the lookout for dedicated professionals in operations, field education, community mobilization, waste engineering, and communication. Work in an environment that values continuous learning, shared success, and measurable social impact.
              </p>
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
                  <h2>Job Application Form</h2>
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
