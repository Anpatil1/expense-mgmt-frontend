import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHome, FaUserPlus, FaSignInAlt, FaGoogle, FaFacebook, FaGithub, FaChartLine, FaWallet, FaShieldAlt } from 'react-icons/fa';

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
            {/* Dynamic Background with Particles */}
            <div className="particle-background">
                <div className="particles">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className={`particle particle-${i % 5}`}></div>
                    ))}
                </div>
                <div className="gradient-overlay"></div>
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
                        <div className="floating-card card-1">
                            <FaChartLine className="card-icon" />
                            <h3>Smart Analytics</h3>
                            <p>AI-powered insights for better financial decisions</p>
                        </div>

                        <div className="floating-card card-2">
                            <FaShieldAlt className="card-icon" />
                            <h3>Secure & Safe</h3>
                            <p>Bank-level security for your financial data</p>
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
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="form-panel">
                    <div className="glass-card">
                        <div className="form-header">
                            <div className="pulse-icon">
                                <FaUser />
                            </div>
                            <h2>Sign In</h2>
                            <p>Welcome back! Please sign in to your account</p>
                        </div>

                        <form onSubmit={handleLogin} className="modern-form">
                            {error && (
                                <div className="error-alert">
                                    <div className="error-icon">⚠️</div>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="input-container">
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

                            <div className="form-options">
                                <label className="modern-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    <span className="checkbox-label">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="forgot-link"
                                    onClick={handleForgotPassword}
                                    disabled={loading}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="modern-submit-btn"
                                disabled={loading || !username || !password}
                            >
                                {loading ? (
                                    <div className="loading-animation">
                                        <div className="spinner"></div>
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    <div className="btn-content">
                                        <FaSignInAlt />
                                        <span>Sign In</span>
                                        <div className="btn-shine"></div>
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="divider-section">
                            <div className="divider-line"></div>
                            <span className="divider-text">or continue with</span>
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
                                Don't have an account?
                                <Link to="/signup" className="signup-link">
                                    <FaUserPlus />
                                    Sign Up
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

export default Login;
