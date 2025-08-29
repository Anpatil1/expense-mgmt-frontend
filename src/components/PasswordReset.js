import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetInitiated, setResetInitiated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.initiatePasswordReset(email);
            setResetInitiated(true);
        } catch (error) {
            setError(error.response ? error.response.data : 'Error initiating password reset');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.resetPassword(email, otp, newPassword);
            setError('');
            alert('Password reset successfully');
            navigate('/login');
        } catch (error) {
            setError(error.response ? error.response.data : 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container reset-variant">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Password Recovery</h2>
                    <p>{!resetInitiated
                        ? "Enter your email to receive a secure OTP"
                        : "Enter the OTP sent to your email and your new password"}
                    </p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!resetInitiated ? (
                    <form onSubmit={handleReset} className="auth-form">
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="form-control"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-block"
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                "Send Recovery OTP"
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordReset} className="auth-form">
                        <div className="form-group">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-block"
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}

                <div className="auth-footer">
                    <p>Remember your password? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
