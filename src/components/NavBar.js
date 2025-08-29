import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Navbar.css';
import logo from '../assests/logo.png';

function NavBar({ setIsLoggedIn, username, photoUrl }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (photoUrl) {
            fetch(`https://expensemanagementapplication-7izlsyxp.b4a.run/api/users/photos/${photoUrl}`)
                .then(response => response.blob())
                .then(blob => {
                    const objectURL = URL.createObjectURL(blob);
                    setProfileImage(objectURL);
                })
                .catch(error => console.error('Error loading profile image:', error));
        }
    }, [photoUrl]);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // Generate random user avatar with first letter
    const getAvatarContent = () => {
        if (profileImage) {
            return (
                <img
                    src={profileImage}
                    alt="User Profile"
                    className="profile-photo"
                />
            );
        }

        if (username) {
            return (
                <span className="profile-initial">
                    {username.charAt(0).toUpperCase()}
                </span>
            );
        }

        return <span className="profile-symbol">👤</span>;
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Expense Management Logo" className="logo-image" />
                    <span>Expense Management</span>
                </Link>
            </div>

            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={toggleNavbar} className="nav-link-item">
                    <span className="nav-icon">🏠</span>
                    <span>Home</span>
                </Link>

                <button onClick={handleLogout} className="logout-button">
                    <span className="logout-icon">🚪</span>
                    <span>Logout</span>
                </button>

                <div className="profile-circle">
                    <Link to={`/profile/${username}`} onClick={toggleNavbar} className="profile-link">
                        {getAvatarContent()}
                    </Link>
                    {username && (
                        <div className="username-display">
                            {username}
                        </div>
                    )}
                </div>
            </div>

            <button className="navbar-toggler" onClick={toggleNavbar}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
        </nav>
    );
}

export default NavBar;
