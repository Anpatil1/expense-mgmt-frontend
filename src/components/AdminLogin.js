import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';
import { FaUserTie, FaLock, FaEye, FaEyeSlash, FaHome, FaUserPlus, FaSignInAlt, FaShieldAlt, FaCrown, FaGoogle, FaFacebook, FaGithub, FaWallet, FaServer, FaUsers, FaCog } from 'react-icons/fa';

const AdminLogin = ({ setIsLoggedIn, updateAuthState }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = await authService.login(username, password, 'ADMIN');
            console.log('Login response:', user);
            if (user && user.role === 'ADMIN') {
                setIsLoggedIn(true);
                updateAuthState();
                console.log('Admin login successful, navigating...');
                navigate('/admin-dashboard');
            } else {
                setError('Unauthorized. Admin access only.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modern-auth-container admin-variant">
            {/* Dynamic Background with Particles */}
            <div className="particle-background">
                <div className="particles">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className={`particle particle-${i % 5} admin-particle`}></div>
                    ))}
                </div>
                <div className="gradient-overlay admin-gradient"></div>
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
                            <FaUsers className="card-icon" />
                            <h3>User Management</h3>
                            <p>Complete control over user accounts and permissions</p>
                        </div>

                        <div className="floating-card card-2 admin-card">
                            <FaServer className="card-icon" />
                            <h3>System Control</h3>
                            <p>Monitor and manage system resources and performance</p>
                        </div>

                        <div className="hero-text admin-hero-text">
                            <div className="admin-crown-icon">
                                <FaCrown />
                            </div>
                            <h1>Administrator Portal</h1>
                            <p>Secure access to advanced system controls and comprehensive management tools.</p>
                            <div className="admin-stats-grid">
                                <div className="stat-item">
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">Secure</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Monitoring</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">99.9%</span>
                                    <span className="stat-label">Uptime</span>
                                </div>
                            </div>
                            <div className="security-features">
                                <div className="security-item">
                                    <FaShieldAlt className="security-icon" />
                                    <span>256-bit Encryption</span>
                                </div>
                                <div className="security-item">
                                    <FaCog className="security-icon" />
                                    <span>Advanced Controls</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Admin Login Form */}
                <div className="form-panel">
                    <div className="glass-card admin-form">
                        <div className="form-header admin-header">
                            <div className="pulse-icon admin-pulse-icon">
                                <FaUserTie />
                            </div>
                            <h2>Administrator Access</h2>
                            <p>Enter your administrative credentials to continue</p>
                            <div className="security-indicator">
                                <FaShieldAlt />
                                <span>Secured Connection</span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="modern-form">
                            {error && (
                                <div className="error-alert admin-error">
                                    <div className="error-icon">🔒</div>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <FaUserTie className="input-icon admin-icon" />
                                    <input
                                        type="text"
                                        placeholder="Administrator Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={loading}
                                        className={`modern-input admin-input ${error ? 'input-error' : ''}`}
                                    />
                                    <div className="input-line admin-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <FaLock className="input-icon admin-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Administrator Password"
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

                            <div className="form-options admin-options">
                                <label className="modern-checkbox admin-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark admin-checkmark"></span>
                                    <span className="checkbox-label">Keep me signed in</span>
                                </label>
                                <div className="admin-help">
                                    <FaShieldAlt />
                                    <span>Need help?</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="modern-submit-btn admin-submit-btn"
                                disabled={loading || !username || !password}
                            >
                                {loading ? (
                                    <div className="loading-animation">
                                        <div className="spinner admin-spinner"></div>
                                        <span>Authenticating...</span>
                                    </div>
                                ) : (
                                    <div className="btn-content">
                                        <FaSignInAlt />
                                        <span>Access Admin Portal</span>
                                        <div className="btn-shine admin-shine"></div>
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="admin-footer">
                            <div className="admin-links">
                                <Link to="/login" className="user-portal-link">
                                    <FaUserTie />
                                    User Portal
                                </Link>
                                <Link to="/AdminSignup" className="admin-signup-link">
                                    <FaUserPlus />
                                    Admin Signup
                                </Link>
                            </div>
                            <div className="admin-disclaimer">
                                <p>⚠️ Authorized personnel only. All activities are logged and monitored.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

