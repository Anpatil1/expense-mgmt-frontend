import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaHome, FaWallet, FaShieldAlt, FaKey } from 'react-icons/fa';

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetInitiated, setResetInitiated] = useState(false);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.initiatePasswordReset(email);
            setResetInitiated(true);
        } catch (error) {
            setError(error.response ? error.response.data : 'Error initiating password reset');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.resetPassword(email, otp, newPassword);
            setError('');
            alert('Password reset successfully');
            navigate('/login');
        } catch (error) {
            setError(error.response ? error.response.data : 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modern-auth-container reset-variant">
            {/* Dynamic Background with Particles */}
            <div className="particle-background">
                <div className="particles">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className={`particle particle-${i % 5} reset-particle`}></div>
                    ))}
                </div>
                <div className="gradient-overlay reset-gradient"></div>
            </div>

            {/* Floating Navigation */}
            <nav className="floating-nav">
                <Link to="/" className="nav-brand">
                    <FaWallet className="brand-icon" />
                    <span>ExpenseTracker</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        <FaHome />
                        <span>Home</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="auth-layout">
                {/* Left Panel - Hero Section */}
                <div className="hero-panel reset-hero">
                    <div className="hero-content">
                        <div className="floating-card card-1 reset-card">
                            <FaShieldAlt className="card-icon" />
                            <h3>Secure Recovery</h3>
                            <p>Bank-level security for password recovery</p>
                        </div>

                        <div className="floating-card card-2 reset-card">
                            <FaKey className="card-icon" />
                            <h3>Instant Access</h3>
                            <p>Regain access to your account in minutes</p>
                        </div>

                        <div className="hero-text">
                            <h1>Password Recovery</h1>
                            <p>Secure and quick password reset with OTP verification to protect your financial data.</p>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-number">256-bit</span>
                                    <span className="stat-label">Encryption</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">2-Factor</span>
                                    <span className="stat-label">Security</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">Instant</span>
                                    <span className="stat-label">Recovery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Reset Form */}
                <div className="form-panel">
                    <div className="glass-card">
                        <div className="form-header">
                            <div className="pulse-icon">
                                <FaLock />
                            </div>
                            <h2>Reset Password</h2>
                            <p>Enter your email to receive a secure OTP</p>
                            <div className="security-indicator">
                                <FaShieldAlt />
                                <span>Secure Recovery Process</span>
                            </div>
                        </div>

                        {error && (
                            <div className="error-alert">
                                <FaLock className="error-icon" />
                                <span>{error}</span>
                            </div>
                        )}

                        {!resetInitiated ? (
                            <form className="modern-form" onSubmit={handleReset}>
                                <div className="input-container">
                                    <div className="input-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="modern-input"
                                            required
                                        />
                                        <div className="input-line"></div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="modern-submit-btn reset-btn"
                                >
                                    <div className="btn-content">
                                        {loading ? (
                                            <div className="loading-animation">
                                                <div className="spinner"></div>
                                                <span>Sending OTP...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <FaEnvelope />
                                                <span>Send Recovery OTP</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="btn-shine"></div>
                                </button>
                            </form>
                        ) : (
                            <form className="modern-form" onSubmit={handlePasswordReset}>
                                <div className="input-row">
                                    <div className="input-container">
                                        <div className="input-wrapper">
                                            <FaKey className="input-icon" />
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                placeholder="Enter OTP"
                                                className="modern-input"
                                                required
                                            />
                                            <div className="input-line"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-container">
                                    <div className="input-wrapper">
                                        <FaLock className="input-icon" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="modern-input"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        <div className="input-line"></div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="modern-submit-btn reset-btn"
                                >
                                    <div className="btn-content">
                                        {loading ? (
                                            <div className="loading-animation">
                                                <div className="spinner"></div>
                                                <span>Resetting...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <FaLock />
                                                <span>Reset Password</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="btn-shine"></div>
                                </button>
                            </form>
                        )}

                        <div className="auth-footer">
                            <p>Remember your password?</p>
                            <Link to="/login" className="signin-link">
                                <span>Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
