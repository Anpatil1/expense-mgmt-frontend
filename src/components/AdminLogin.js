import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaCrown, FaChartLine, FaUsers, FaCog } from 'react-icons/fa';
import { MdSecurity, MdDashboard, MdAnalytics } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import authService from '../services/authService';
import '../Styles/AdminLogin.css';

const AdminLogin = ({ setIsLoggedIn, updateAuthState }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formFocus, setFormFocus] = useState(null);
    const [backgroundShapes, setBackgroundShapes] = useState([]);
    const navigate = useNavigate();

    // Generate random background shapes for animation
    useEffect(() => {
        const shapes = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            size: Math.random() * 100 + 50,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15
        }));
        setBackgroundShapes(shapes);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const user = await authService.login(username, password, 'ADMIN');
            console.log('Login response:', user);

            if (setIsLoggedIn) setIsLoggedIn(true);
            if (updateAuthState) updateAuthState();

            // Add success animation delay
            setTimeout(() => {
                navigate('/admin-dashboard');
            }, 1000);
        } catch (error) {
            console.error('Admin login error:', error);
            setError('Invalid username or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputFocus = (field) => {
        setFormFocus(field);
    };

    const handleInputBlur = () => {
        setFormFocus(null);
    };

    return (
        <div className="admin-login-container">
            {/* Animated Background */}
            <div className="admin-bg-animation">
                {backgroundShapes.map(shape => (
                    <div
                        key={shape.id}
                        className="admin-shape"
                        style={{
                            width: shape.size + 'px',
                            height: shape.size + 'px',
                            left: shape.x + '%',
                            top: shape.y + '%',
                            animationDelay: shape.delay + 's',
                            animationDuration: shape.duration + 's'
                        }}
                    />
                ))}
            </div>

            {/* Floating Feature Cards */}
            <div className="floating-features">
                <div className="feature-card card-1">
                    <MdDashboard />
                    <span>Dashboard Control</span>
                </div>
                <div className="feature-card card-2">
                    <FaUsers />
                    <span>User Management</span>
                </div>
                <div className="feature-card card-3">
                    <MdAnalytics />
                    <span>Analytics</span>
                </div>
                <div className="feature-card card-4">
                    <FaCog />
                    <span>System Config</span>
                </div>
            </div>

            {/* Main Login Card */}
            <div className={`admin-login-card ${isLoading ? 'loading' : ''}`}>
                {/* Header Section */}
                <div className="login-header">
                    <div className="admin-icon-container">
                        <FaCrown className="crown-icon" />
                        <FaShieldAlt className="shield-icon" />
                        <HiSparkles className="sparkle-1" />
                        <HiSparkles className="sparkle-2" />
                        <HiSparkles className="sparkle-3" />
                    </div>
                    <h2>Admin Portal</h2>
                    <p>Secure Administrative Access</p>
                    <div className="security-badge">
                        <MdSecurity />
                        <span>Enterprise Security</span>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        <div className="error-icon">⚠️</div>
                        <span>{error}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="admin-login-form">
                    {/* Username Field */}
                    <div className={`input-group ${formFocus === 'username' ? 'focused' : ''}`}>
                        <div className="input-icon">
                            <FaUserShield />
                        </div>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => handleInputFocus('username')}
                            onBlur={handleInputBlur}
                            required
                            placeholder="Administrator Username"
                            disabled={isLoading}
                        />
                        <label htmlFor="username">Username</label>
                        <div className="input-line"></div>
                    </div>

                    {/* Password Field */}
                    <div className={`input-group ${formFocus === 'password' ? 'focused' : ''}`}>
                        <div className="input-icon">
                            <FaLock />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => handleInputFocus('password')}
                            onBlur={handleInputBlur}
                            required
                            placeholder="Secure Password"
                            disabled={isLoading}
                        />
                        <label htmlFor="password">Password</label>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                            disabled={isLoading}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <div className="input-line"></div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`admin-login-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="loading-spinner"></div>
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            <>
                                <FaShieldAlt />
                                <span>Access Admin Portal</span>
                                <div className="btn-shine"></div>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="login-footer">
                    <div className="admin-features">
                        <div className="feature-item">
                            <FaChartLine />
                            <span>Advanced Analytics</span>
                        </div>
                        <div className="feature-item">
                            <FaUsers />
                            <span>User Management</span>
                        </div>
                        <div className="feature-item">
                            <MdSecurity />
                            <span>Security Controls</span>
                        </div>
                    </div>
                    <p className="security-note">
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>

            {/* Success Overlay */}
            {isLoading && (
                <div className="success-overlay">
                    <div className="success-animation">
                        <FaCrown className="success-crown" />
                        <div className="success-rings">
                            <div className="ring ring-1"></div>
                            <div className="ring ring-2"></div>
                            <div className="ring ring-3"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
