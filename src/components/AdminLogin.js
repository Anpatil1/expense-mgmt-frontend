import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/AdminLogin.css'; // Import the CSS file

const AdminLogin = ({ setIsLoggedIn, updateAuthState }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.login(username, password, 'ADMIN');
            console.log('Login response:', user); // Debug log
            if (user && user.role === 'ADMIN') {
                setIsLoggedIn(true);
                updateAuthState();
                console.log('Admin login successful, navigating...'); // Debug log
                navigate('/admin-dashboard');
            } else {
                setError('Unauthorized. Admin access only.');
            }
        } catch (err) {
            console.error('Login error:', err); // Debug log
            setError('Invalid username or password');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2>Admin Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
