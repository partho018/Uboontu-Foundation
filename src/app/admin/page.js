'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ShieldAlert, 
  Key, 
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  getSession, 
  saveSession, 
  clearSession,
  checkRateLimit, 
  generateCSRFToken, 
  validateCSRFToken,
  addActivityLog,
  initDb
} from '@/lib/storage';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  // 2FA state
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    initDb();
    // Redirect if already logged in
    const session = getSession();
    if (session) {
      router.push('/admin/dashboard');
    }
    
    // Generate CSRF Token for the session
    setCsrfToken(generateCSRFToken());
  }, [router]);

  const validateInputs = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // 1. Rate Limiting Check
    if (!checkRateLimit('login_attempts', 5, 60000)) {
      setError('Too many login attempts. Locked for 60 seconds.');
      return;
    }

    // 2. CSRF Token Check
    if (!validateCSRFToken(csrfToken)) {
      setError('Security validation failed. Please refresh the page.');
      return;
    }

    // 3. Input Validation
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (!json.ok) {
        setError(json.error || 'Invalid email or password.');
        setLoading(false);
        return;
      }

      const user = json.data;

      // If 2FA enabled, show 2FA form
      if (user.twoFactorEnabled) {
        setPendingUser(user);
        setShow2FA(true);
        setLoading(false);
        setSuccess('Password accepted. Please verify 2FA.');
        return;
      }

      // Save session
      saveSession(user);
      // Log to D1 (fire-and-forget)
      addActivityLog(user.name, 'Login', 'Logged in successfully via D1').catch(() => {});

      setSuccess('Login successful! Redirecting...');
      setLoading(false);
      setTimeout(() => router.push('/admin/dashboard'), 900);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (twoFactorCode !== '123456' && twoFactorCode !== pendingUser.twoFactorSecret) {
      setError('Invalid authentication code. Hint: Use 123456 or your profile key.');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate mock JWT Token
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + 
      btoa(JSON.stringify({ id: pendingUser.id, email: pendingUser.email, role: pendingUser.role, name: pendingUser.name })) + 
      '.mockSignature';

    const sessionUser = { ...pendingUser, token: mockToken };
    saveSession(sessionUser);
    addActivityLog(pendingUser.name, '2FA Verify', 'Logged in successfully after passing 2FA verification');

    setSuccess('Authentication successful! Redirecting...');
    setLoading(false);

    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span>Uboontu</span>Admin
          </div>
          <p className="login-subtitle">
            {show2FA ? 'Two-Factor Authentication' : 'Secure Management Portal'}
          </p>
        </div>

        {error && (
          <div className="login-alert">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="login-alert" style={{ background: 'rgba(59, 184, 82, 0.15)', borderColor: 'rgba(59, 184, 82, 0.3)', color: '#a7f3d0' }}>
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        {!show2FA ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="login-form-group">
              <label className="login-label" htmlFor="email">Email Address</label>
              <div className="login-input-wrap">
                <input 
                  type="email" 
                  id="email" 
                  className="login-input"
                  placeholder="admin@uboontu.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <Mail className="login-input-icon" size={18} />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label" htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <Lock className="login-input-icon" size={18} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--admin-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <input type="hidden" name="csrf_token" value={csrfToken} />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handle2FASubmit}>
            <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '20px', lineHeight: '1.4' }}>
              Two-Factor Authentication is enabled for your account. Enter the 6-digit verification code from your authenticator app.
            </p>
            <div className="login-form-group">
              <label className="login-label" htmlFor="2fa-code">Verification Code</label>
              <div className="login-input-wrap">
                <input 
                  type="text" 
                  id="2fa-code" 
                  className="login-input"
                  placeholder="123456"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  disabled={loading}
                  required
                />
                <Key className="login-input-icon" size={18} />
              </div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '8px' }}>
                Hint: Check settings or use default code: <code>123456</code>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                className="login-btn secondary"
                style={{ flex: 1, marginTop: '10px', boxShadow: 'none' }}
                onClick={() => {
                  setShow2FA(false);
                  setTwoFactorCode('');
                  setPendingUser(null);
                  setError('');
                  setSuccess('');
                }}
                disabled={loading}
              >
                Back
              </button>
              <button type="submit" className="login-btn" style={{ flex: 2, marginTop: '10px' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
