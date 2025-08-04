import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';
import userService from "../services/userService";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome, FaSignInAlt, FaUserPlus, FaShieldAlt, FaCrown, FaWallet, FaUserTie, FaServer, FaCog } from 'react-icons/fa';

function AdminSignup() {
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

        if (password.length < 8) {
            setError('Admin password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        if (!acceptTerms) {
            setError('Please accept the admin terms and conditions');
            setLoading(false);
            return;
        }

        try {
            const signupRequest = { username, email, password };
            await userService.createUser(signupRequest);
            navigate('/Adminlogin');
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating admin account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modern-auth-container admin-variant admin-signup-variant">
            {/* Dynamic Background with Particles */}
            <div className="particle-background">
                <div className="particles">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className={`particle particle-${i % 5} admin-particle`}></div>
                    ))}
                </div>
                <div className="gradient-overlay admin-signup-gradient"></div>
            </div>

            {/* Floating Navigation */}
            <nav className="floating-nav admin-nav">
                <Link to="/" className="nav-brand admin-brand">
                    <FaWallet className="brand-icon" />
                    <span>ExpenseTracker</span>
                    <div className="admin-badge">Admin</div>
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
                {/* Left Panel - Admin Hero Section */}
                <div className="hero-panel admin-hero">
                    <div className="hero-content">
                        <div className="floating-card card-1 admin-card">
                            <FaShieldAlt className="card-icon" />
                            <h3>Elite Access</h3>
                            <p>Join the exclusive administrator team</p>
                        </div>

                        <div className="floating-card card-2 admin-card">
                            <FaCog className="card-icon" />
                            <h3>Full Control</h3>
                            <p>Complete system management capabilities</p>
                        </div>

                        <div className="hero-text admin-hero-text">
                            <div className="admin-crown-icon signup-crown">
                                <FaCrown />
                            </div>
                            <h1>Join the Admin Elite</h1>
                            <p>Create your administrator account and gain access to powerful management tools and system controls.</p>
                            <div className="admin-privileges-list">
                                <div className="privilege-item">
                                    <div className="privilege-icon">👑</div>
                                    <span>Ultimate system access</span>
                                </div>
                                <div className="privilege-item">
                                    <div className="privilege-icon">🛡️</div>
                                    <span>Advanced security features</span>
                                </div>
                                <div className="privilege-item">
                                    <div className="privilege-icon">📊</div>
                                    <span>Comprehensive analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Admin Signup Form */}
                <div className="form-panel">
                    <div className="glass-card admin-form admin-signup-form">
                        <div className="form-header admin-header">
                            <div className="pulse-icon admin-pulse-icon">
                                <FaUserTie />
                            </div>
                            <h2>Administrator Registration</h2>
                            <p>Create your administrative account with enhanced privileges</p>
                            <div className="security-indicator admin-security">
                                <FaShieldAlt />
                                <span>High Security Required</span>
                            </div>
                        </div>

                        <form onSubmit={handleSignup} className="modern-form">
                            {error && (
                                <div className="error-alert admin-error">
                                    <div className="error-icon">🔒</div>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="input-row">
                                <div className="input-container half-width">
                                    <div className="input-wrapper">
                                        <FaUserTie className="input-icon admin-icon" />
                                        <input
                                            type="text"
                                            placeholder="Admin Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            disabled={loading}
                                            className={`modern-input admin-input ${error ? 'input-error' : ''}`}
                                        />
                                        <div className="input-line admin-line"></div>
                                    </div>
                                </div>

                                <div className="input-container half-width">
                                    <div className="input-wrapper">
                                        <FaEnvelope className="input-icon admin-icon" />
                                        <input
                                            type="email"
                                            placeholder="Admin Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                            className={`modern-input admin-input ${error ? 'input-error' : ''}`}
                                        />
                                        <div className="input-line admin-line"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <FaLock className="input-icon admin-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Secure Password (8+ characters)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className={`modern-input admin-input ${error ? 'input-error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle admin-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <div className="input-line admin-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <FaLock className="input-icon admin-icon" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm Secure Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className={`modern-input admin-input ${error ? 'input-error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle admin-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <div className="input-line admin-line"></div>
                                </div>
                            </div>

                            <div className="terms-section admin-terms">
                                <label className="modern-checkbox admin-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <span className="checkmark admin-checkmark"></span>
                                    <span className="checkbox-label">
                                        I agree to the <a href="#" className="terms-link admin-terms-link">Administrator Terms</a>,
                                        <a href="#" className="terms-link admin-terms-link">Privacy Policy</a>, and
                                        <a href="#" className="terms-link admin-terms-link">Code of Conduct</a>
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="modern-submit-btn admin-submit-btn admin-signup-btn"
                                disabled={loading || !username || !email || !password || !confirmPassword || !acceptTerms}
                            >
                                {loading ? (
                                    <div className="loading-animation">
                                        <div className="spinner admin-spinner"></div>
                                        <span>Creating Admin Account...</span>
                                    </div>
                                ) : (
                                    <div className="btn-content">
                                        <FaCrown />
                                        <span>Create Admin Account</span>
                                        <div className="btn-shine admin-shine"></div>
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="admin-footer admin-signup-footer">
                            <div className="admin-links">
                                <Link to="/Adminlogin" className="admin-signin-link">
                                    <FaSignInAlt />
                                    Admin Sign In
                                </Link>
                                <Link to="/login" className="user-portal-link">
                                    <FaUser />
                                    User Portal
                                </Link>
                            </div>
                            <div className="admin-disclaimer">
                                <p>🔐 Admin accounts require approval and are subject to verification.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;