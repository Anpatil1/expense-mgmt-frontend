import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import '../Styles/Navbar.css';
import logo from '../assests/logo.png';
import {
    FaBars,
    FaTimes,
    FaHome,
    FaChartLine,
    FaWallet,
    FaList,
    FaPlus,
    FaCog,
    FaSignOutAlt,
    FaUserEdit,
    FaChevronDown
} from 'react-icons/fa';

function NavBar({ setIsLoggedIn, username, photoUrl }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imageLoadError, setImageLoadError] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Load profile image
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

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [profileImage]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setShowUserDropdown(false);
    }, [location]);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const getUserInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                {/* Logo */}
                <Link to="/dashboard" className="navbar-logo">
                    <img src={logo} alt="ExpenseTracker" />
                    <span className="logo-text">ExpenseTracker</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="navbar-links">
                    <Link
                        to="/dashboard"
                        className={`navbar-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
                    >
                        <FaHome className="nav-icon" />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/expenses"
                        className={`navbar-link ${isActiveLink('/expenses') ? 'active' : ''}`}
                    >
                        <FaWallet className="nav-icon" />
                        <span>Expenses</span>
                    </Link>

                    <Link
                        to="/incomes"
                        className={`navbar-link ${isActiveLink('/incomes') ? 'active' : ''}`}
                    >
                        <FaPlus className="nav-icon" />
                        <span>Income</span>
                    </Link>

                    <Link
                        to="/expense-list"
                        className={`navbar-link ${isActiveLink('/expense-list') ? 'active' : ''}`}
                    >
                        <FaList className="nav-icon" />
                        <span>Reports</span>
                    </Link>

                    <Link
                        to="/generate-report"
                        className={`navbar-link ${isActiveLink('/generate-report') ? 'active' : ''}`}
                    >
                        <FaChartLine className="nav-icon" />
                        <span>Analytics</span>
                    </Link>
                </div>

                {/* User Profile & Mobile Menu */}
                <div className="navbar-user">
                    <div className="user-profile" onClick={toggleUserDropdown}>
                        {profileImage && !imageLoadError ? (
                            <img src={profileImage} alt="Profile" className="user-avatar" />
                        ) : (
                            <div className="user-avatar">
                                {getUserInitials(username)}
                            </div>
                        )}
                        <div className="user-info">
                            <span className="user-name">{username}</span>
                            <span className="user-role">User</span>
                        </div>
                        <FaChevronDown className="dropdown-arrow" />
                    </div>

                    {/* User Dropdown */}
                    <div className={`user-dropdown ${showUserDropdown ? 'open' : ''}`}>
                        <Link to="/profile" className="dropdown-item">
                            <FaUserEdit />
                            Edit Profile
                        </Link>
                        <Link to="/settings" className="dropdown-item">
                            <FaCog />
                            Settings
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button onClick={handleLogout} className="dropdown-item danger">
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-menu-header">
                        <Link to="/dashboard" className="navbar-logo">
                            <img src={logo} alt="ExpenseTracker" />
                            <span className="logo-text">ExpenseTracker</span>
                        </Link>
                        <button
                            className="mobile-close-btn"
                            onClick={toggleMobileMenu}
                            aria-label="Close mobile menu"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="mobile-nav-links">
                        <Link
                            to="/dashboard"
                            className={`mobile-nav-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
                        >
                            <FaHome />
                            Dashboard
                        </Link>

                        <Link
                            to="/expenses"
                            className={`mobile-nav-link ${isActiveLink('/expenses') ? 'active' : ''}`}
                        >
                            <FaWallet />
                            Expenses
                        </Link>

                        <Link
                            to="/incomes"
                            className={`mobile-nav-link ${isActiveLink('/incomes') ? 'active' : ''}`}
                        >
                            <FaPlus />
                            Income
                        </Link>

                        <Link
                            to="/expense-list"
                            className={`mobile-nav-link ${isActiveLink('/expense-list') ? 'active' : ''}`}
                        >
                            <FaList />
                            Reports
                        </Link>

                        <Link
                            to="/generate-report"
                            className={`mobile-nav-link ${isActiveLink('/generate-report') ? 'active' : ''}`}
                        >
                            <FaChartLine />
                            Analytics
                        </Link>
                    </div>

                    <div className="mobile-user-section">
                        <Link to="/profile" className="mobile-nav-link">
                            <FaUserEdit />
                            Edit Profile
                        </Link>
                        <Link to="/settings" className="mobile-nav-link">
                            <FaCog />
                            Settings
                        </Link>
                        <button onClick={handleLogout} className="mobile-nav-link danger">
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdowns */}
            {(showUserDropdown || isOpen) && (
                <div
                    className="overlay"
                    onClick={() => {
                        setShowUserDropdown(false);
                        setIsOpen(false);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                        background: 'transparent'
                    }}
                />
            )}
        </>
    );
}

export default NavBar;