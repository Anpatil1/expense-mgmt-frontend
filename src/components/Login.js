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
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <img src="/logo192.png" alt="ExpenseTracker" />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to manage your expenses</p>
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
                            placeholder="Username or Email"
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
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="form-group" style={{ textAlign: 'right' }}>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="btn-link"
                        >
                            Forgot Password?
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
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
