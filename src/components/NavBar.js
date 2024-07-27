import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Navbar.css'; // Import the CSS file for styling

// Import your logo image
import logo from '../assests/logo.png';

function NavBar({ setIsLoggedIn, username, photoUrl }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Expense Management Logo" className="logo-image" />
                    Expense Management
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </li>
                <li>
                    <div className="profile-circle">
                        <Link to={`/profile/${username}`}>
                            {photoUrl ? (
                                <img
                                    src={`http://localhost:8080/api/users/photos/${photoUrl}`}
                                    alt="User Profile"
                                    className="profile-photo"
                                />
                            ) : (
                                <span className="profile-placeholder">P</span>
                            )}
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
