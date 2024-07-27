import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Login.css'; // Import the CSS file

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetInitiated, setResetInitiated] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.initiatePasswordReset(email); // Ensure email is passed correctly here
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
            await authService.resetPassword(email, otp, newPassword); // Ensure email is passed correctly here
            setError('');
            alert('Password reset successfully');
            navigate('/login'); // Redirect to login page after successful reset
        } catch (error) {
            setError(error.response ? error.response.data : 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Password Reset</h2>
                {!resetInitiated ? (
                    <form onSubmit={handleReset}>
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
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" disabled={loading} className="login-button">
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordReset}>
                        <div className="input-group">
                            <label htmlFor="otp">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" disabled={loading} className="login-button">
                            {loading ? 'Resetting password...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default PasswordReset;
