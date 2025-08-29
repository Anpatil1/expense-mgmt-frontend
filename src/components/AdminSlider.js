// src/components/AdminSlider.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/adminSlider.css';
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaChartBar,
  FaBars,
  FaTimes,
  FaCog
} from 'react-icons/fa';

const AdminSlider = () => {
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
        { path: '/admin-dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
        { path: '/admin/users', icon: <FaUsers />, label: 'Manage Users' },
        { path: '/admin/expenses', icon: <FaMoneyBillWave />, label: 'Manage Expenses' },
        { path: '/admin/incomes', icon: <FaMoneyBillWave />, label: 'Manage Incomes' },
        { path: '/admin/reports', icon: <FaChartBar />, label: 'Generate Reports' },
        { path: '/admin/settings', icon: <FaCog />, label: 'Settings' }
    ];

    return (
        <>
            <div className={`admin-slider ${isOpen ? 'open' : ''}`}>
                <div className="slider-header">
                    <h3>Admin Portal</h3>
                </div>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={activeLink === item.path ? 'active' : ''}>
                            <Link to={item.path} onClick={handleLinkClick}>
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className={`admin-slider-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleSlider}
                aria-label="Toggle admin menu"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </>
    );
};

export default AdminSlider;
