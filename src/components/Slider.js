import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Slider.css';
import {
  FaTachometerAlt,
  FaMoneyBill,
  FaWallet,
  FaFileImport,
  FaFileExport,
  FaBars,
  FaTimes,
  FaUser,
  FaChartLine
} from 'react-icons/fa';

function Slider() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    // Update active link based on current path
    useEffect(() => {
        const path = location.pathname;
        setActiveLink(path);
    }, [location]);

    const toggleSlider = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        // Only close slider on mobile views
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };

    // Menu items for easy management
    const menuItems = [
        { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
        { path: '/expenses/new', icon: <FaMoneyBill />, label: 'Add Expense' },
        { path: '/expenses', icon: <FaMoneyBill />, label: 'My Expenses' },
        { path: '/incomes/new', icon: <FaWallet />, label: 'Add Income' },
        { path: '/incomes', icon: <FaWallet />, label: 'My Incomes' },
        { path: '/bulk-import', icon: <FaFileImport />, label: 'Bulk Import' },
        { path: '/generate-report', icon: <FaFileExport />, label: 'Generate Report' },
        { path: '/analytics', icon: <FaChartLine />, label: 'Analytics' },
        { path: '/profile', icon: <FaUser />, label: 'My Profile' }
    ];

    return (
        <>
            <div className={`slider-container ${isOpen ? 'open' : ''}`}>
                <div className="slider-header">
                    <h2>Expense Manager</h2>
                </div>
                <nav className="slider-nav">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className={activeLink === item.path ? 'active' : ''}>
                                <Link to={item.path} onClick={handleLinkClick}>
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div
                className={`user-slider-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleSlider}
                aria-label="Toggle navigation menu"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </>
    );
}

export default Slider;