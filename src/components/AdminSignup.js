import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';
import SignupImage from '../assests/signup.png';
import userService from "../services/userService";

function AdminSignup() {
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
            const signupRequest = { username, email, password };
            await userService.createUser(signupRequest);
            navigate('/Adminlogin');
        } catch (error) {
            setError(error.response?.data?.message || 'Error signing up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="signup-card">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2>Admin Sign Up</h2>
                        <form onSubmit={handleSignup}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
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
                                    name="email"
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
                                    name="password"
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
                            Already have an account? <Link to="/Adminlogin">Login</Link>
                        </div>
                    </div>
                    <div className="signup-image">
                        <img src={SignupImage} alt="Signup"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;