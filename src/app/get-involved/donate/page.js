'use client';

import { useState } from 'react';
import { HandHeart, CheckCircle2, Send } from 'lucide-react';

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
    <main className="get-involved-page">
      {/* Content Section */}
      <section className="gi-split-section">
        <div className="container gi-split-container">
          <div className="gi-split-grid scroll-reveal reveal-fade-up">
            <div className="gi-split-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80" 
                alt="Support Our Cause - Charity Donations" 
              />
            </div>
            <div className="gi-split-content">
              <span className="gi-eyebrow" style={{ alignSelf: 'flex-start' }}>
                <HandHeart size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Donate
              </span>
              <h1 className="gi-split-title">Support Our <span className="elegant-serif">Cause</span></h1>
              <p className="gi-split-subtitle">
                Every contribution helps us build cleaner communities, promote circular economics, and empower citizens through green education.
              </p>
              <div className="gi-split-divider" />
              <p className="gi-split-desc-lead">
                Your support can help Uboontu Foundation create cleaner communities, promote scientific waste management, and empower citizens through environmental awareness and sustainability initiatives.
              </p>
              <p className="gi-split-desc-body">
                Every contribution—big or small—helps us scale source segregation, distribute composting systems, establish Material Recovery Facilities, and fund grassroots environmental education campaigns. Partner with us in making sustainability a shared way of life.
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
