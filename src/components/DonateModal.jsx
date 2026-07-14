'use client';

import { useState } from 'react';
import { X, Heart, Sparkles, Check } from 'lucide-react';

export default function DonateModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  if (!isOpen) return null;

  const handlePredefinedClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedAmount = customAmount || amount;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-header">
              <div className="heart-icon-wrapper">
                <Heart size={24} fill="currentColor" className="heart-icon" />
              </div>
              <h2>Make a Difference</h2>
              <p>Your contribution directly powers waste diversion, community empowerment, and circular economy projects.</p>
            </div>

            {/* Donation Frequency */}
            <div className="frequency-selector">
              <button 
                type="button" 
                className={`freq-btn ${frequency === 'one-time' ? 'active' : ''}`}
                onClick={() => setFrequency('one-time')}
              >
                One-Time
              </button>
              <button 
                type="button" 
                className={`freq-btn ${frequency === 'monthly' ? 'active' : ''}`}
                onClick={() => setFrequency('monthly')}
              >
                <Sparkles size={14} /> Monthly Partner
              </button>
            </div>

            {/* Donation Tiers */}
            <div className="tiers-grid">
              {['10', '25', '50', '100'].map((val) => (
                <button
                  type="button"
                  key={val}
                  className={`tier-btn ${amount === val ? 'active' : ''}`}
                  onClick={() => handlePredefinedClick(val)}
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="custom-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={handleCustomChange}
                className="custom-amount-input"
                min="1"
              />
            </div>

            {/* Personal Details */}
            <div className="details-inputs">
              <div className="input-group">
                <label htmlFor="donor-name">Full Name</label>
                <input 
                  type="text" 
                  id="donor-name" 
                  required 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label htmlFor="donor-email">Email Address</label>
                <input 
                  type="email" 
                  id="donor-email" 
                  required 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Donate ${selectedAmount || '0'} {frequency === 'monthly' ? '/ Month' : ''}
            </button>
          </form>
        ) : (
          <div className="success-state">
            <div className="success-icon-wrapper animate-float">
              <Check size={40} className="success-icon" />
            </div>
            <h2>Thank You, {formData.name}!</h2>
            <p className="success-msg">
              Your generous donation of <strong>${selectedAmount}</strong> has been received. 
              A confirmation and tax receipt have been sent to <strong>{formData.email}</strong>.
            </p>
            <div className="success-card">
              <p>Your impact:</p>
              <ul>
                <li>Diverts approx. <strong>{parseInt(selectedAmount) * 10} kg</strong> of waste from landfills</li>
                <li>Supports local waste collectors (Safai Sathis)</li>
                <li>Promotes zero-waste circular systems</li>
              </ul>
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
          max-width: 500px;
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
          margin-bottom: 2rem;
        }

        .heart-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 6px 15px rgba(244, 63, 94, 0.3);
        }

        .form-header h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .frequency-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          padding: 0.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-color);
        }

        .freq-btn {
          padding: 0.75rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .freq-btn.active {
          background-color: var(--bg-secondary);
          color: var(--primary);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .tiers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .tier-btn {
          padding: 0.875rem;
          border-radius: 12px;
          border: 2px solid var(--border-color);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .tier-btn.active {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .custom-input-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .currency-symbol {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .custom-amount-input {
          width: 100%;
          padding: 1rem 1rem 1rem 2.5rem;
          border-radius: 12px;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .custom-amount-input:focus {
          outline: none;
          border-color: var(--primary);
          background-color: var(--bg-secondary);
        }

        .details-inputs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
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

        .input-group input {
          padding: 0.875rem 1rem;
          border-radius: 12px;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: all var(--transition-fast);
        }

        .input-group input:focus {
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

        .success-card ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .success-card li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .success-card li::before {
          content: '•';
          color: var(--primary);
          font-weight: bold;
        }

        .close-success-btn {
          width: 100%;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
