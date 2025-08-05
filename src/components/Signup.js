import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome, FaSignInAlt, FaUserPlus, FaGoogle, FaFacebook, FaGithub, FaRocket, FaShieldAlt, FaMobile, FaWallet, FaCheckCircle } from 'react-icons/fa';

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
                                    <FaCheckCircle className="benefit-icon" />
                                    <span>Free forever plan</span>
                                </div>
                                <div className="benefit-item">
                                    <FaCheckCircle className="benefit-icon" />
                                    <span>Advanced analytics</span>
                                </div>
                                <div className="benefit-item">
                                    <FaCheckCircle className="benefit-icon" />
                                    <span>Bank-level security</span>
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
                            <div className="security-indicator">
                                <FaShieldAlt />
                                <span>Secure Registration</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="social-login-grid">
                            <button className="social-btn google-btn" type="button">
                                <FaGoogle />
                                <span>Google</span>
                            </button>
                            <button className="social-btn facebook-btn" type="button">
                                <FaFacebook />
                                <span>Facebook</span>
                            </button>
                            <button className="social-btn github-btn" type="button">
                                <FaGithub />
                                <span>GitHub</span>
                            </button>
                        </div>

                        <div className="divider-section">
                            <div className="divider-line"></div>
                            <span className="divider-text">OR</span>
                            <div className="divider-line"></div>
                        </div>

                        {error && (
                            <div className="error-alert">
                                <FaLock className="error-icon" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="modern-form" onSubmit={handleSignup}>
                            <div className="input-row">
                                <div className="input-container">
                                    <div className="input-wrapper">
                                        <FaUser className="input-icon" />
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
                                        <FaEnvelope className="input-icon" />
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
                                    <FaLock className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
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

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <FaLock className="input-icon" />
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
                                    <div className="checkmark"></div>
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
                                        <>
                                            <FaUserPlus />
                                            <span>Create Account</span>
                                        </>
                                    )}
                                </div>
                                <div className="btn-shine"></div>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account?</p>
                            <Link to="/login" className="signin-link">
                                <FaSignInAlt />
                                <span>Sign In</span>
                            </Link>

                            <div className="admin-access">
                                <Link to="/Adminlogin" className="admin-portal-link">
                                    <FaShieldAlt />
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
