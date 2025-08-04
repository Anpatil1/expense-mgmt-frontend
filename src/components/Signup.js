import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome, FaSignInAlt, FaUserPlus, FaGoogle, FaFacebook, FaGithub, FaRocket, FaShieldAlt, FaMobile, FaWallet } from 'react-icons/fa';

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
            {/* Dynamic Background with Particles */}
            <div className="particle-background">
                <div className="particles">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className={`particle particle-${i % 5}`}></div>
                    ))}
                </div>
                <div className="gradient-overlay signup-gradient"></div>
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
                <div className="hero-panel">
                    <div className="hero-content">
                        <div className="floating-card card-1 signup-card">
                            <FaRocket className="card-icon" />
                            <h3>Quick Setup</h3>
                            <p>Get started in under 2 minutes</p>
                        </div>

                        <div className="floating-card card-2 signup-card">
                            <FaMobile className="card-icon" />
                            <h3>Mobile Ready</h3>
                            <p>Access anywhere, anytime on any device</p>
                        </div>

                        <div className="hero-text">
                            <h1>Join the Financial Revolution</h1>
                            <p>Start your journey to smarter money management with our cutting-edge platform designed for the modern user.</p>
                            <div className="benefits-list">
                                <div className="benefit-item">
                                    <div className="benefit-icon">✨</div>
                                    <span>Free forever plan</span>
                                </div>
                                <div className="benefit-item">
                                    <div className="benefit-icon">🔐</div>
                                    <span>Bank-level security</span>
                                </div>
                                <div className="benefit-item">
                                    <div className="benefit-icon">📊</div>
                                    <span>Advanced analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Signup Form */}
                <div className="form-panel">
                    <div className="glass-card signup-form">
                        <div className="form-header">
                            <div className="pulse-icon signup-icon">
                                <FaUserPlus />
                            </div>
                            <h2>Create Account</h2>
                            <p>Join thousands of users managing their finances smarter</p>
                        </div>

                        <form onSubmit={handleSignup} className="modern-form">
                            {error && (
                                <div className="error-alert">
                                    <div className="error-icon">⚠️</div>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="input-row">
                                <div className="input-container half-width">
                                    <div className="input-wrapper">
                                        <FaUser className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            disabled={loading}
                                            className={`modern-input ${error ? 'input-error' : ''}`}
                                        />
                                        <div className="input-line"></div>
                                    </div>
                                </div>

                                <div className="input-container half-width">
                                    <div className="input-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                            className={`modern-input ${error ? 'input-error' : ''}`}
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
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className={`modern-input ${error ? 'input-error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <FaLock className="input-icon" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className={`modern-input ${error ? 'input-error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="terms-section">
                                <label className="modern-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="checkbox-label">
                                        I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="modern-submit-btn signup-btn"
                                disabled={loading || !username || !email || !password || !confirmPassword || !acceptTerms}
                            >
                                {loading ? (
                                    <div className="loading-animation">
                                        <div className="spinner"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="btn-content">
                                        <FaUserPlus />
                                        <span>Create Account</span>
                                        <div className="btn-shine"></div>
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="divider-section">
                            <div className="divider-line"></div>
                            <span className="divider-text">or sign up with</span>
                            <div className="divider-line"></div>
                        </div>

                        <div className="social-login-grid">
                            <button className="social-btn google-btn">
                                <FaGoogle />
                                <span>Google</span>
                            </button>
                            <button className="social-btn facebook-btn">
                                <FaFacebook />
                                <span>Facebook</span>
                            </button>
                            <button className="social-btn github-btn">
                                <FaGithub />
                                <span>GitHub</span>
                            </button>
                        </div>

                        <div className="auth-footer">
                            <p>
                                Already have an account?
                                <Link to="/login" className="signin-link">
                                    <FaSignInAlt />
                                    Sign In
                                </Link>
                            </p>
                            <div className="admin-access">
                                <Link to="/Adminlogin" className="admin-portal-link">
                                    <FaShieldAlt />
                                    Admin Portal
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
