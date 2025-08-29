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
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="User Profile"
                                className="profile-photo"
                            />
                        ) : (
                            <FaUser className="profile-placeholder" />
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
