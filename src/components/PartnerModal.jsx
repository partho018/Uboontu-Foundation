'use client';

import { useState } from 'react';
import { X, Handshake, CheckCircle } from 'lucide-react';

export default function PartnerModal({ isOpen, onClose }) {
  const [partnerType, setPartnerType] = useState('corporate');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orgName: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const partnerTypes = [
    { id: 'corporate', label: 'Corporate' },
    { id: 'government', label: 'Government / ULB' },
    { id: 'residential', label: 'Residential / RWA' },
    { id: 'institution', label: 'Institution / NGO' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-header">
              <div className="handshake-icon-wrapper">
                <Handshake size={24} className="handshake-icon" />
              </div>
              <h2>Partner With Us</h2>
              <p>Join forces with Uboontu Foundation to co-create sustainable waste management models and drive circular economy solutions.</p>
            </div>

            {/* Partner Types */}
            <div className="partner-type-label">Entity Type</div>
            <div className="partner-type-grid">
              {partnerTypes.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  className={`type-btn ${partnerType === type.id ? 'active' : ''}`}
                  onClick={() => setPartnerType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Input fields */}
            <div className="details-inputs">
              <div className="input-group">
                <label htmlFor="partner-name">Contact Person</label>
                <input 
                  type="text" 
                  id="partner-name" 
                  required 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-group-row">
                <div className="input-group">
                  <label htmlFor="partner-email">Email Address</label>
                  <input 
                    type="email" 
                    id="partner-email" 
                    required 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="partner-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="partner-phone" 
                    required 
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="partner-org">Organization Name</label>
                <input 
                  type="text" 
                  id="partner-org" 
                  required 
                  placeholder="Eco Corp Ltd."
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label htmlFor="partner-msg">Collaboration Proposal</label>
                <textarea 
                  id="partner-msg" 
                  rows="3" 
                  required 
                  placeholder="Describe how you would like to collaborate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Submit Collaboration Request
            </button>
          </form>
        ) : (
          <div className="success-state">
            <div className="success-icon-wrapper animate-float">
              <CheckCircle size={40} className="success-icon" />
            </div>
            <h2>Collaboration Request Sent!</h2>
            <p className="success-msg">
              Thank you, <strong>{formData.name}</strong> from <strong>{formData.orgName}</strong>.
              Our partnership relations team will reach out to you at <strong>{formData.email}</strong> within 2 business days.
            </p>
            <div className="success-card">
              <p>Next steps in our partnership process:</p>
              <ol>
                <li><strong>Initial Review:</strong> Evaluating alignment with local municipal and state regulations.</li>
                <li><strong>Discovery Call:</strong> Mapping on-ground waste management systems and stakeholders.</li>
                <li><strong>MoU Formulation:</strong> Drafting roles, resource allocations, and KPIs.</li>
              </ol>
            </div>
            <button type="button" className="btn btn-primary close-success-btn" onClick={onClose}>
              Return to Website
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 15, 11, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          border-radius: var(--radius-lg);
          padding: 3rem;
          width: 100%;
          max-width: 550px;
          position: relative;
          color: var(--text-primary);
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .modal-close:hover {
          color: var(--text-primary);
          background: var(--border-color);
          transform: rotate(90deg);
        }

        .form-header {
          text-align: center;
          margin-bottom: 1.75rem;
        }

        .handshake-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 6px 15px rgba(59, 184, 82, 0.3);
        }

        .form-header h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .partner-type-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .partner-type-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .type-btn {
          padding: 0.75rem;
          border-radius: 10px;
          border: 1.5px solid var(--border-color);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
        }

        .type-btn.active {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .details-inputs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .input-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .input-group input, 
        .input-group textarea {
          padding: 0.875rem 1rem;
          border-radius: 12px;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: all var(--transition-fast);
          width: 100%;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          background-color: var(--bg-secondary);
        }

        .submit-btn {
          width: 100%;
        }

        /* Success State */
        .success-state {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .success-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          background-color: var(--primary-light);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-msg {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .success-card {
          width: 100%;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: left;
        }

        .success-card p {
          font-weight: 700;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .success-card ol {
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .success-card li {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .success-card li strong {
          color: var(--text-primary);
        }

        .close-success-btn {
          width: 100%;
          margin-top: 1rem;
        }

        @media (max-width: 576px) {
          .input-group-row {
            grid-template-columns: 1fr;
          }
          .partner-type-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
