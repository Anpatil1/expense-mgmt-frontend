// src/components/AdminSlider.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTachometerAlt, faUsers, faMoneyBillWave, faChartBar } from '@fortawesome/free-solid-svg-icons';
import '../Styles/adminSlider.css';

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
                <h3>Admin Menu</h3>
                <ul>
                    <li>
                        <Link to="/admin-dashboard" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Manage Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/expenses" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faMoneyBillWave} />
                            <span>Manage Expenses</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/incomes" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faMoneyBillWave} />
                            <span>Manage Incomes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reports" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faChartBar} />
                            <span>Generate Reports</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`slider-toggle ${isOpen ? 'open' : ''}`} onClick={toggleSlider}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
        </>
    );
};

export default AdminSlider;
