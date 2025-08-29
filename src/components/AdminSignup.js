import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css';
import userService from "../services/userService";

function AdminSignup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Admin password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        if (!acceptTerms) {
            setError('Please accept the admin terms and conditions');
            setLoading(false);
            return;
        }

        try {
            const signupRequest = { username, email, password };
            await userService.createUser(signupRequest);
            navigate('/Adminlogin');
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating admin account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container admin-variant">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <img src="/logo192.png" alt="ExpenseTracker Admin" />
                    </div>
                    <h2>Admin Registration</h2>
                    <p>Create an administrator account</p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="auth-form">
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
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password (min 8 characters)"
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

                    <div className="form-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="form-control"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                            />
                            <span>I accept the Administrator Terms and Responsibilities</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-block"
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Creating Admin Account...
                            </>
                        ) : (
                            "Register as Administrator"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an admin account? <Link to="/Adminlogin">Admin Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;