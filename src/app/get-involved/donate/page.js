'use client';

import { useState } from 'react';
import { HandHeart, CheckCircle2, Send, Award, Heart } from 'lucide-react';

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pledgeAmount: '5000',
    frequency: 'one-time',
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
      pledgeAmount: '5000',
      frequency: 'one-time',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <main className="get-involved-page donate-page">
      {/* Background Decorative Elements */}
      <div className="gi-bg-decorations">
        <div className="bg-orb orb-donate-1"></div>
        <div className="bg-orb orb-donate-2"></div>
        <div className="bg-grid-overlay"></div>
        <div className="floating-hearts-container">
          <div className="heart-particle hp-1"></div>
          <div className="heart-particle hp-2"></div>
          <div className="heart-particle hp-3"></div>
          <div className="heart-particle hp-4"></div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="about-hero donate-hero">
        <div className="container">
          <div className="about-hero-grid donate-hero-grid">
            
            {/* Text Content Column */}
            <div className="about-hero-content scroll-reveal reveal-fade-right duration-slow">
              <span className="about-eyebrow">
                <HandHeart size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Donate
              </span>
              <h1 className="about-title">
                Support Our <span className="elegant-serif text-gradient">Cause</span>
              </h1>
              <p className="about-desc-lead">
                Every contribution helps us build cleaner communities, promote circular economics, and empower citizens through green education.
              </p>
              <p className="about-desc-body">
                Every contribution—big or small—helps us scale source segregation, distribute composting systems, establish Material Recovery Facilities, and fund grassroots environmental education campaigns. Partner with us in making sustainability a shared way of life.
              </p>
              <div className="hero-cta-buttons">
                <button 
                  onClick={() => document.querySelector('.gi-form-section')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="btn btn-primary"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Pledge Now
                </button>
              </div>
            </div>

            {/* Visual Image Column (Staggered Stack) */}
            <div className="gi-hero-visual-stack scroll-reveal reveal-fade-left duration-slow">
              <div className="gi-stack-container">
                
                {/* Main Image */}
                <div className="gi-main-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80" 
                    alt="Support Our Cause - Charity Donations" 
                    className="gi-main-img"
                  />
                </div>
                
                {/* Sub Image */}
                <div className="gi-sub-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80" 
                    alt="Uboontu Charity Work" 
                    className="gi-sub-img"
                  />
                </div>

                {/* Floating Metric 1 */}
                <div className="floating-metric gi-metric-1">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                    <Award size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">80G Tax</span>
                    <span className="metric-lbl">Exemptions</span>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="floating-metric gi-metric-2">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
                    <Heart size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">100%</span>
                    <span className="metric-lbl">Transparent</span>
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
                  <h2>Donation Inquiry & <span className="elegant-serif">Pledge</span></h2>
                  <p>Submit a donation pledge or make an inquiry about our environmental projects.</p>
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
                        placeholder="Your name"
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
                      <label htmlFor="frequency">Contribution Frequency</label>
                      <select 
                        id="frequency" 
                        name="frequency" 
                        value={formData.frequency} 
                        onChange={handleChange}
                        className="gi-select"
                      >
                        <option value="one-time">One-Time Contribution</option>
                        <option value="monthly">Monthly Giving Support</option>
                        <option value="annually">Annual Support Pledge</option>
                      </select>
                    </div>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="pledgeAmount">Pledge Amount (INR)</label>
                    <input 
                      type="number" 
                      id="pledgeAmount" 
                      name="pledgeAmount" 
                      required 
                      value={formData.pledgeAmount} 
                      onChange={handleChange}
                      className="gi-input" 
                      placeholder="e.g. 5000"
                    />
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="message">Message / Designation of Donation</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      value={formData.message} 
                      onChange={handleChange}
                      className="gi-textarea" 
                      placeholder="Specify if you wish to fund a particular project (e.g. Project Manbhar, School Awareness, Tree Planting)..."
                    />
                  </div>

                  <button type="submit" className="gi-submit-btn">
                    Submit Pledge Inquiry <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="gi-success-state">
                <div className="gi-success-icon">
                  <CheckCircle2 size={40} />
                </div>
                <h3>Pledge Submitted</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>, for your generous support pledge of <strong>INR {formData.pledgeAmount}</strong>. Our finance and partnership team will contact you shortly with receipt instructions, tax exemption receipts (80G), and certificates.
                </p>
                <button className="gi-reset-btn" onClick={handleReset}>
                  Submit Another Pledge
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
