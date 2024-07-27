import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Navbar.css';
import logo from '../assests/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

function NavBar({ setIsLoggedIn, username, photoUrl }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Expense Management Logo" className="logo-image" />
                    Expense Management
                </Link>
            </div>
            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={toggleNavbar}>Home</Link>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
                <div className="profile-circle">
                    <Link to={`/profile/${username}`} onClick={toggleNavbar}>
                        {photoUrl ? (
                            <img
                                src={`/api/users/photos/${photoUrl}`}
                                alt="User Profile"
                                className="profile-photo"
                            />
                        ) : (
                            <span className="profile-placeholder">P</span>
                        )}
                    </Link>
                </div>
            </div>
            <button className="navbar-toggler" onClick={toggleNavbar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </nav>
    );
}

export default NavBar;