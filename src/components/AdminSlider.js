// src/components/AdminSlider.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/adminSlider.css';
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';

const AdminSlider = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSlider = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={`admin-slider ${isOpen ? 'open' : ''}`}>
                <div className="slider-header">
                    <h3>Admin Menu</h3>
                </div>
                <ul>
                    <li>
                        <Link to="/admin-dashboard" onClick={handleLinkClick}>
                            <FaTachometerAlt />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" onClick={handleLinkClick}>
                            <FaUsers />
                            <span>Manage Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/expenses" onClick={handleLinkClick}>
                            <FaMoneyBillWave />
                            <span>Manage Expenses</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/incomes" onClick={handleLinkClick}>
                            <FaMoneyBillWave />
                            <span>Manage Incomes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reports" onClick={handleLinkClick}>
                            <FaChartBar />
                            <span>Generate Reports</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`slider-toggle ${isOpen ? 'open' : ''}`} onClick={toggleSlider}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </>
    );
};

export default AdminSlider;
