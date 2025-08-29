import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';
import { FaHome, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

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
        <div className="auth-container admin-variant">
            <div className="auth-navigation">
                <Link to="/" className="back-button" title="Back to Home">
                    <FaArrowLeft /> <span>Back</span>
                </Link>
                <Link to="/" className="home-button" title="Go to Home">
                    <FaHome /> <span>Home</span>
                </Link>
            </div>
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <img src="/logo192.png" alt="ExpenseTracker Admin" />
                    </div>
                    <h2>Admin Portal</h2>
                    <p>Sign in to access the admin dashboard</p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Admin Username"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-block"
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            "Admin Sign In"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Not an admin?{' '}
                        <Link to="/login" className="auth-link">
                            User Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
