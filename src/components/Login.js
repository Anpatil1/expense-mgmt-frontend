import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css'; // Import the CSS file
import LoginImage from '../assests/LogIn.png'; // Import the Login image

function Login({ setIsLoggedIn, updateAuthState }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
        navigate('/resetPass'); // Navigate to the forgot password page
    };

    const handleAnimateLogin = () => {
        // Placeholder for animation or interaction
        console.log('Animating login...');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-content">
                    <div className="login-image-card">
                        <img src={LoginImage} alt="Login" className="login-image" />
                    </div>
                    <div className="login-form-card">
                        <h2>Welcome Back!</h2>
                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="login-button"
                                onClick={handleAnimateLogin}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="forgot-password-link">
                            <Link to="/resetPass">Forgot Password?</Link>
                        </div>
                        <div className="signup-link">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>
                        <div className="signup-link">
                            Click and Go to Home page! <Link to="/">Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
