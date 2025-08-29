import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (!acceptTerms) {
            setError('Please accept the terms and conditions');
            setLoading(false);
            return;
        }

        try {
            await authService.signup(username, email, password);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data || 'Error signing up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modern-auth-container signup-variant">
            {/* Advanced Background System */}
            <div className="particle-background">
                <div className="geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
                <div className="gradient-overlay signup-gradient"></div>
            </div>

            {/* Floating Navigation */}
            <nav className="floating-nav">
                <Link to="/" className="nav-brand">
                    <span className="brand-text">ExpenseTracker</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        <span>Home</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="auth-layout">
                {/* Left Panel - Hero Section */}
                <div className="hero-panel">
                    <div className="hero-content">
                        <div className="floating-card card-1 signup-card">
                            <h3>Quick Setup</h3>
                            <p>Get started in under 2 minutes with our streamlined process</p>
                        </div>

                        <div className="floating-card card-2 signup-card">
                            <h3>Mobile Ready</h3>
                            <p>Access anywhere, anytime on any device with full sync</p>
                        </div>

                        <div className="hero-text">
                            <h1>Join the Financial Revolution</h1>
                            <p>Start your journey to smarter money management with our cutting-edge platform designed for the modern user.</p>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-number">Free</span>
                                    <span className="stat-label">Forever Plan</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">AI</span>
                                    <span className="stat-label">Analytics</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">Bank</span>
                                    <span className="stat-label">Security</span>
                                </div>
                            </div>

                            <div className="security-features">
                                <div className="security-item">
                                    <span className="security-symbol">🚀</span>
                                    <span>Fast Setup</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">🔒</span>
                                    <span>Secure Data</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">📊</span>
                                    <span>Smart Insights</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Signup Form */}
                <div className="form-panel">
                    <div className="glass-card signup-form">
                        <div className="form-header">
                            <div className="pulse-element signup-icon">
                                <span>+</span>
                            </div>
                            <h2>Create Account</h2>
                            <p>Join thousands of users managing their finances smarter</p>
                            <div className="security-badge">
                                <span>Secure Registration</span>
                            </div>
                        </div>

                        {error && (
                            <div className="error-alert">
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="modern-form" onSubmit={handleSignup}>
                            <div className="input-row">
                                <div className="input-container">
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                            className="modern-input"
                                            required
                                        />
                                        <div className="input-line"></div>
                                    </div>
                                </div>

                                <div className="input-container">
                                    <div className="input-wrapper">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            className="modern-input"
                                            required
                                        />
                                        <div className="input-line"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password (min 6 characters)"
                                        className="modern-input"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        className="modern-input"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="modern-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <span className="checkbox-label">
                                        I agree to the{' '}
                                        <Link to="/terms" className="terms-link">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="modern-submit-btn signup-btn"
                            >
                                <div className="btn-content">
                                    {loading ? (
                                        <div className="loading-animation">
                                            <div className="spinner"></div>
                                            <span>Creating account...</span>
                                        </div>
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account?</p>
                            <Link to="/login" className="signin-link">
                                <span>Sign In</span>
                            </Link>

                            <div className="admin-access">
                                <Link to="/Adminlogin" className="admin-portal-link">
                                    <span>Admin Portal</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
