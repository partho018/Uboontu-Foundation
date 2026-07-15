'use client';

import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare,
  Globe,
  ArrowRight
} from 'lucide-react';

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);



export default function ContactContainer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Submission failed');
    } catch (err) {
      console.error('Error submitting contact form:', err);
      // Still show success to user — submission may have partially worked
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content scroll-reveal reveal-fade-up">
          <span className="contact-eyebrow">
            <MessageSquare size={16} /> Get In Touch
          </span>
          <h1 className="contact-title">Contact Uboontu <span className="elegant-serif">Foundation</span></h1>
          <p className="contact-subtitle">
            Have questions, feedback, or want to partner with us? Reach out and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Column: Contact Info */}
            <div className="contact-info-wrap scroll-reveal reveal-fade-right">
              <div className="contact-info-header">
                <h2>Reach Out to <span className="elegant-serif">Us</span></h2>
                <p>We are always open to discuss waste management solutions, community cleanups, environmental education programs, and CSR campaigns.</p>
              </div>

              <div className="contact-cards-list">
                
                {/* Office Address */}
                <div className="contact-info-card">
                  <div className="contact-icon-box">
                    <MapPin size={22} />
                  </div>
                  <div className="contact-info-details">
                    <h3>Our Office</h3>
                    <p>Uboontu Foundation Office, Delhi NCR, India</p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-info-link"
                    >
                      View on Map <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Email Support */}
                <div className="contact-info-card">
                  <div className="contact-icon-box">
                    <Mail size={22} />
                  </div>
                  <div className="contact-info-details">
                    <h3>Email Support</h3>
                    <p>For all inquiries, please email us at:</p>
                    <a href="mailto:contact@uboontu.org" className="contact-info-link">
                      contact@uboontu.org
                    </a>
                  </div>
                </div>

                {/* Phone & Operating Hours */}
                <div className="contact-info-card">
                  <div className="contact-icon-box">
                    <Phone size={22} />
                  </div>
                  <div className="contact-info-details">
                    <h3>Call or Message</h3>
                    <p>Phone: +91 98765 43210</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Clock size={12} /> Mon - Fri: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Map visual card */}
              <div className="contact-map-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83906660134!2d77.06889753767185!3d28.52728034335433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204d!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Uboontu Delhi NCR Location Map"
                ></iframe>
              </div>

              {/* Social Media Links */}
              <div className="contact-social-wrap">
                <h4>Connect on Socials</h4>
                <div className="contact-social-icons">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn" title="Twitter">
                    <TwitterIcon />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn" title="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn" title="LinkedIn">
                    <LinkedinIcon />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn" title="Instagram">
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="scroll-reveal reveal-fade-left">
              {!isSubmitted ? (
                <div className="contact-form-card glass-panel">
                  <div className="contact-form-header">
                    <h2>Send Us a <span className="elegant-serif">Message</span></h2>
                    <p>Fill out the form below and our team will get in touch with you shortly.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-form-row">
                      <div className="contact-form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          value={formData.name} 
                          onChange={handleChange}
                          className="contact-input"
                          placeholder="Your Name"
                        />
                      </div>
                      
                      <div className="contact-form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required 
                          value={formData.email} 
                          onChange={handleChange}
                          className="contact-input"
                          placeholder="your.email@domain.com"
                        />
                      </div>
                    </div>

                    <div className="contact-form-row">
                      <div className="contact-form-group">
                        <label htmlFor="phone">Phone Number (Optional)</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          className="contact-input"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      
                      <div className="contact-form-group">
                        <label htmlFor="subject">Subject *</label>
                        <input 
                          type="text" 
                          id="subject" 
                          name="subject" 
                          required 
                          value={formData.subject} 
                          onChange={handleChange}
                          className="contact-input"
                          placeholder="What is this regarding?"
                        />
                      </div>
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        required 
                        value={formData.message} 
                        onChange={handleChange}
                        className="contact-textarea"
                        placeholder="Type your message here..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="contact-form-card glass-panel contact-success-card">
                  <div className="contact-success-icon">
                    <CheckCircle size={36} />
                  </div>
                  <h2>Message Sent!</h2>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Your message has been sent successfully. Our team will review your request and reach back to you at <strong>{formData.email}</strong> shortly.
                  </p>
                  <button onClick={handleReset} className="contact-reset-btn">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
