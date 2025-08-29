import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';
import userService from "../services/userService";

function AdminSignup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState('');
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
            {/* Advanced Background System */}
            <div className="particle-background">
                <div className="geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
                <div className="gradient-overlay admin-signup-gradient"></div>
            </div>

            {/* Floating Navigation */}
            <nav className="floating-nav admin-nav">
                <Link to="/" className="nav-brand admin-brand">
                    <span className="brand-text">ExpenseTracker</span>
                    <div className="admin-badge">Admin</div>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">
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
                            <h3>Elite Access</h3>
                            <p>Join the exclusive administrator team</p>
                        </div>

                        <div className="floating-card card-2 admin-card">
                            <h3>Full Control</h3>
                            <p>Complete system management capabilities</p>
                        </div>

                        <div className="hero-text admin-hero-text">
                            <div className="admin-crown-symbol signup-crown">
                                <span>◆</span>
                            </div>
                            <h1>Join Admin Elite</h1>
                            <p>Create your administrator account with enhanced privileges and comprehensive system access.</p>

                            <div className="admin-privileges-list">
                                <div className="privilege-item">
                                    <span className="privilege-symbol">⚙</span>
                                    <span>Full system administration</span>
                                </div>
                                <div className="privilege-item">
                                    <span className="privilege-symbol">🗄</span>
                                    <span>Database management</span>
                                </div>
                                <div className="privilege-item">
                                    <span className="privilege-symbol">👥</span>
                                    <span>User account control</span>
                                </div>
                                <div className="privilege-item">
                                    <span className="privilege-symbol">📊</span>
                                    <span>Advanced analytics</span>
                                </div>
                            </div>

                            <div className="security-features">
                                <div className="security-item">
                                    <span className="security-symbol">🛡</span>
                                    <span>Enhanced Security</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">📋</span>
                                    <span>Audit Logging</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">🎯</span>
                                    <span>Priority Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Admin Signup Form */}
                <div className="form-panel">
                    <div className="glass-card admin-form signup-form">
                        <div className="form-header admin-header">
                            <div className="pulse-element admin-pulse-icon">
                                <span>◈</span>
                            </div>
                            <h2>Create Admin Account</h2>
                            <p>Register for administrator privileges</p>
                            <div className="security-badge admin-security">
                                <span>Secure Admin Registration</span>
                            </div>
                        </div>

                        {error && (
                            <div className="error-alert admin-error">
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
                                            placeholder="Admin username"
                                            className="modern-input admin-input"
                                            required
                                        />
                                        <div className="input-line admin-line"></div>
                                    </div>
                                </div>

                                <div className="input-container">
                                    <div className="input-wrapper">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Admin email address"
                                            className="modern-input admin-input"
                                            required
                                        />
                                        <div className="input-line admin-line"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Administrator password (min 8 chars)"
                                        className="modern-input admin-input"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle admin-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                    <div className="input-line admin-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm administrator password"
                                        className="modern-input admin-input"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle admin-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                    <div className="input-line admin-line"></div>
                                </div>
                            </div>

                            <div className="terms-section">
                                <label className="modern-checkbox admin-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <span className="checkbox-label">
                                        I agree to the{' '}
                                        <Link to="/admin-terms" className="terms-link admin-terms-link">Administrator Terms</Link>
                                        {' '}and{' '}
                                        <Link to="/admin-privacy" className="terms-link admin-terms-link">Admin Privacy Policy</Link>
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="modern-submit-btn admin-submit-btn"
                            >
                                <div className="btn-content">
                                    {loading ? (
                                        <div className="loading-animation">
                                            <div className="spinner"></div>
                                            <span>Creating admin account...</span>
                                        </div>
                                    ) : (
                                        <span>Create Admin Account</span>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="auth-footer admin-footer">
                            <div className="admin-links">
                                <Link to="/Adminlogin" className="admin-signin-link">
                                    <span>Admin Sign In</span>
                                </Link>
                                <Link to="/login" className="user-portal-link">
                                    <span>User Portal</span>
                                </Link>
                            </div>

                            <div className="admin-disclaimer">
                                <p>Admin accounts require approval and verification before activation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;