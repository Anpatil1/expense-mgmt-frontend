import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';

function Login({ setIsLoggedIn, updateAuthState }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userData = await authService.login(username, password, 'USER');
            setIsLoggedIn(true);
            updateAuthState();
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigate('/resetPass');
    };

    return (
        <div className="modern-auth-container">
            {/* Advanced Background System */}
            <div className="particle-background">
                <div className="geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
                <div className="gradient-overlay"></div>
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
                        <div className="floating-card card-1">
                            <h3>Smart Analytics</h3>
                            <p>AI-powered insights for better financial decisions and expense tracking</p>
                        </div>

                        <div className="floating-card card-2">
                            <h3>Secure & Safe</h3>
                            <p>Bank-level security protocols protect your financial data</p>
                        </div>

                        <div className="hero-text">
                            <h1>Welcome Back to the Future of Finance</h1>
                            <p>Experience next-generation expense management with intelligent insights and beautiful design.</p>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-number">50K+</span>
                                    <span className="stat-label">Active Users</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">$10M+</span>
                                    <span className="stat-label">Tracked</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">99.9%</span>
                                    <span className="stat-label">Uptime</span>
                                </div>
                            </div>

                            <div className="security-features">
                                <div className="security-item">
                                    <span className="security-symbol">🛡</span>
                                    <span>Bank Security</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">⚡</span>
                                    <span>Fast Access</span>
                                </div>
                                <div className="security-item">
                                    <span className="security-symbol">📱</span>
                                    <span>Mobile Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="form-panel">
                    <div className="glass-card">
                        <div className="form-header">
                            <div className="pulse-element">
                                <span>→</span>
                            </div>
                            <h2>Welcome Back</h2>
                            <p>Sign in to your account</p>
                            <div className="security-badge">
                                <span>Secure Login</span>
                            </div>
                        </div>

                        {error && (
                            <div className="error-alert">
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
                                        placeholder="Username or email"
                                        className="modern-input"
                                        required
                                    />
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
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
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="modern-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkbox-label">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="forgot-link"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="modern-submit-btn"
                            >
                                <div className="btn-content">
                                    {loading ? (
                                        <div className="loading-animation">
                                            <div className="spinner"></div>
                                            <span>Signing in...</span>
                                        </div>
                                    ) : (
                                        <span>Sign In</span>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="signup-link">
                                <span>Create Account</span>
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

export default Login;
