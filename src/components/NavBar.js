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

    useEffect(() => {
        if (photoUrl) {
            setImageLoadError(false);
            fetch(`https://expense-backend-1-hnul.onrender.com/api/users/photos/${photoUrl}`)
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

    const handleLogout = () => {
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
            // Return default user icon with enhanced styling
            return <FaUser className="profile-placeholder" />;
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
                <div className={`profile-circle ${(!profileImage || imageLoadError) ? 'default-profile' : ''}`}>
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