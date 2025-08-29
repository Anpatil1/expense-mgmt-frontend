import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';

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
            {/* Advanced Background System */}
            <div className="particle-background">
                <div className="geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
                <div className="gradient-overlay admin-gradient"></div>
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
                            <h3>User Management</h3>
                            <p>Complete control over user accounts and permissions</p>
                        </div>

                        <div className="floating-card card-2 admin-card">
                            <h3>System Control</h3>
                            <p>Monitor and manage system resources and performance</p>
                        </div>

                        <div className="hero-text admin-hero-text">
                            <div className="admin-crown-symbol">
                                <span>★</span>
                            </div>
                            <h1>Administrator Portal</h1>
                            <p>Secure access to advanced system controls and comprehensive management tools.</p>
                            <div className="stats-grid admin-stats-grid">
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
                                    <span className="security-symbol">⚡</span>
                                    <span>Multi-Factor Auth</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">🔒</span>
                                    <span>Encrypted Storage</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">⚙</span>
                                    <span>Secure Servers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Admin Login Form */}
                <div className="form-panel">
                    <div className="glass-card admin-form">
                        <div className="form-header admin-header">
                            <div className="pulse-element admin-pulse-icon">
                                <span>▲</span>
                            </div>
                            <h2>Admin Access</h2>
                            <p>Secure administrator login portal</p>
                            <div className="security-badge admin-security">
                                <span>High Security Zone</span>
                            </div>
                        </div>

                        {error && (
                            <div className="error-alert admin-error">
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="modern-form" onSubmit={handleLogin}>
                            <div className="input-container">
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Administrator username"
                                        className="modern-input admin-input"
                                        required
                                    />
                                    <div className="input-line admin-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Administrator password"
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

                            <div className="form-options">
                                <label className="modern-checkbox admin-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkbox-label">Remember this session</span>
                                </label>
                                <button
                                    type="button"
                                    className="admin-help"
                                >
                                    <span>Need Help?</span>
                                </button>
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
                                            <span>Authenticating...</span>
                                        </div>
                                    ) : (
                                        <span>Access Admin Portal</span>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="auth-footer admin-footer">
                            <div className="admin-links">
                                <Link to="/login" className="user-portal-link">
                                    <span>User Portal</span>
                                </Link>
                                <Link to="/AdminSignup" className="admin-signup-link">
                                    <span>Admin Signup</span>
                                </Link>
                            </div>

                            <div className="admin-disclaimer">
                                <p>Restricted access. Administrator credentials required.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
