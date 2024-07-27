import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css'; // Import the CSS file
import SignupImage from '../assests/signup.png'; // Import the Signup image

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.signup(username, email, password);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            setError(error.response?.data || 'Error signing up'); // Capture and display specific error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="signup-card">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignup}>
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
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <button type="submit" disabled={loading} className="login-button">
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </form>
                        <div className="signup-link">
                            Already have an account? <a href="/Login">Login</a>
                        </div>
                    </div>
                    <div className="signup-image">
                        <img src={SignupImage} alt="Signup" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
