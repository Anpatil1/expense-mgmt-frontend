import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Navbar.css';
import logo from '../assests/logo.png';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

function NavBar({ setIsLoggedIn, username, photoUrl }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imageLoadError, setImageLoadError] = useState(false);

    // Since this component is only rendered when logged in (from App.js), no need to check here

    useEffect(() => {
        if (photoUrl) {
            setImageLoadError(false);
            fetch(`https://expensemanagementapplication-7izlsyxp.b4a.run/api/users/photos/${photoUrl}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load image');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const objectURL = URL.createObjectURL(blob);
                    setProfileImage(objectURL);
                })
                .catch(error => {
                    console.error('Error loading profile image:', error);
                    setImageLoadError(true);
                    setProfileImage(null);
                });
        } else {
            setProfileImage(null);
            setImageLoadError(false);
        }
    }, [photoUrl]);

    // Separate useEffect for cleanup to avoid dependency issues
    useEffect(() => {
        return () => {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [profileImage]);

    const handleLogout = () => {
        // Close mobile menu if open
        setIsOpen(false);

        // Clean up profile image URL
        if (profileImage) {
            URL.revokeObjectURL(profileImage);
        }

        authService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleImageError = () => {
        setImageLoadError(true);
        setProfileImage(null);
    };

    const renderProfileContent = () => {
        if (profileImage && !imageLoadError) {
            return (
                <img
                    src={profileImage}
                    alt="User Profile"
                    className="profile-photo"
                    onError={handleImageError}
                />
            );
        } else {
            // Show user's first letter as default or FaUser icon
            const firstLetter = username ? username.charAt(0).toUpperCase() : '';
            return firstLetter ? (
                <span className="profile-letter">{firstLetter}</span>
            ) : (
                <FaUser className="profile-placeholder" />
            );
        }
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
                <Link to="/" onClick={toggleNavbar}>Home</Link>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
                <div className="profile-circle">
                    <Link to={`/profile/${username}`} onClick={toggleNavbar}>
                        {renderProfileContent()}
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