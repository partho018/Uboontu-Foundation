'use client';

import { useState } from 'react';
import { Users, CheckCircle2, Send, Leaf, Briefcase } from 'lucide-react';

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'cleanup',
    availability: 'weekends',
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
      interest: 'cleanup',
      availability: 'weekends',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <main className="get-involved-page volunteer-page">
      {/* Background Decorative Elements */}
      <div className="gi-bg-decorations">
        <div className="bg-orb orb-volunteer-1"></div>
        <div className="bg-orb orb-volunteer-2"></div>
        <div className="bg-grid-overlay"></div>
        <div className="floating-leaves-container">
          <div className="leaf-particle lp-1"><Leaf size={24} /></div>
          <div className="leaf-particle lp-2"><Leaf size={32} /></div>
          <div className="leaf-particle lp-3"><Leaf size={20} /></div>
          <div className="leaf-particle lp-4"><Leaf size={28} /></div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="about-hero volunteer-hero">
        <div className="container">
          <div className="about-hero-grid volunteer-hero-grid">
            
            {/* Text Content Column */}
            <div className="about-hero-content scroll-reveal reveal-fade-right duration-slow">
              <span className="about-eyebrow">
                <Users size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Volunteer
              </span>
              <h1 className="about-title">
                Volunteer With <span className="elegant-serif text-gradient">Us</span>
              </h1>
              <p className="about-desc-lead">
                Join the movement towards cleaner, healthier, and more sustainable communities through your skills, time, and action.
              </p>
              <p className="about-desc-body">
                Whether you want to participate in on-ground cleanliness campaigns, run social media awareness drives, write articles, or help organize eco-events, your skills can create a massive difference. Join our network of eco-warriors today and drive environmental awareness and meaningful social impact!
              </p>
              <div className="hero-cta-buttons">
                <button 
                  onClick={() => document.querySelector('.gi-form-section')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="btn btn-primary"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Join Us
                </button>
              </div>
            </div>

            {/* Visual Image Column (Staggered Stack) */}
            <div className="gi-hero-visual-stack scroll-reveal reveal-fade-left duration-slow">
              <div className="gi-stack-container">
                
                {/* Main Image */}
                <div className="gi-main-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80" 
                    alt="Volunteer With Us - Community Action" 
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
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(59, 184, 82, 0.15)', color: 'var(--primary)' }}>
                    <Leaf size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">500+</span>
                    <span className="metric-lbl">Eco-Warriors</span>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="floating-metric gi-metric-2">
                  <div className="metric-icon" style={{ backgroundColor: 'rgba(13, 148, 136, 0.15)', color: '#0d9488' }}>
                    <Users size={18} />
                  </div>
                  <div className="metric-text">
                    <span className="metric-val">12+ Drives</span>
                    <span className="metric-lbl">Monthly Events</span>
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
                  <h2>Volunteer <span className="elegant-serif">Registration</span></h2>
                  <p>Register as a volunteer to join our on-ground campaigns and events.</p>
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
                      <label htmlFor="availability">Availability</label>
                      <select 
                        id="availability" 
                        name="availability" 
                        value={formData.availability} 
                        onChange={handleChange}
                        className="gi-select"
                      >
                        <option value="weekends">Weekends Only</option>
                        <option value="weekdays">Weekdays Only</option>
                        <option value="flexible">Flexible / Dynamic Schedule</option>
                      </select>
                    </div>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="interest">Primary Interest Area</label>
                    <select 
                      id="interest" 
                      name="interest" 
                      value={formData.interest} 
                      onChange={handleChange}
                      className="gi-select"
                    >
                      <option value="cleanup">Clean-up & Waste Segregation Campaigns</option>
                      <option value="advocacy">Public Advocacy & Environmental Education</option>
                      <option value="events">Event Coordination & Logistics</option>
                      <option value="media">Photography, Writing, & Social Media</option>
                    </select>
                  </div>

                  <div className="gi-form-group">
                    <label htmlFor="message">Why would you like to join?</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={4} 
                      value={formData.message} 
                      onChange={handleChange}
                      className="gi-textarea" 
                      placeholder="Share a short message about why volunteering with Uboontu is important to you..."
                    />
                  </div>

                  <button type="submit" className="gi-submit-btn">
                    Submit Registration <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="gi-success-state">
                <div className="gi-success-icon">
                  <CheckCircle2 size={40} />
                </div>
                <h3>Registration Successful</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>, for joining our volunteer network! We have recorded your availability and interest in <strong>{formData.interest === 'cleanup' ? 'Clean-up Campaigns' : formData.interest === 'advocacy' ? 'Public Advocacy' : formData.interest === 'events' ? 'Event Coordination' : 'Media Operations'}</strong>. We will notify you of upcoming on-ground campaigns soon.
                </p>
                <button className="gi-reset-btn" onClick={handleReset}>
                  Register Another Volunteer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
