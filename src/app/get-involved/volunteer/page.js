'use client';

import { useState } from 'react';
import { Users, CheckCircle2, Send } from 'lucide-react';

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
    <main className="get-involved-page">
      {/* Content Section */}
      <section className="gi-split-section">
        <div className="container gi-split-container">
          <div className="gi-split-grid scroll-reveal reveal-fade-up">
            <div className="gi-split-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80" 
                alt="Volunteer With Us - Community Action" 
              />
            </div>
            <div className="gi-split-content">
              <span className="gi-eyebrow" style={{ alignSelf: 'flex-start' }}>
                <Users size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Volunteer
              </span>
              <h1 className="gi-split-title">Volunteer With Us</h1>
              <p className="gi-split-subtitle">
                Join the movement towards cleaner, healthier, and more sustainable communities through your skills, time, and action.
              </p>
              <div className="gi-split-divider" />
              <p className="gi-split-desc-lead">
                Become a volunteer with Uboontu Foundation and be part of the movement towards cleaner and more sustainable communities.
              </p>
              <p className="gi-split-desc-body">
                Whether you want to participate in on-ground cleanliness campaigns, run social media awareness drives, write articles, or help organize eco-events, your skills can create a massive difference. Join our network of eco-warriors today and drive environmental awareness and meaningful social impact!
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
                  <h2>Volunteer Registration</h2>
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
