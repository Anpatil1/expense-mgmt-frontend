import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Slider.css';
import { FaTachometerAlt, FaMoneyBill, FaWallet, FaFileImport, FaFileExport } from 'react-icons/fa';

function Slider() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSlider = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`slider-container ${isOpen ? 'open' : ''}`}>
                <div className="slider-header">
                    <h2>Menu</h2>
                </div>
                <nav className="slider-nav">
                    <ul>
                        <li>
                            <Link to="/dashboard" onClick={toggleSlider}>
                                <FaTachometerAlt /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/expenses/new" onClick={toggleSlider}>
                                <FaMoneyBill /> Expenses
                            </Link>
                        </li>
                        <li>
                            <Link to="/incomes/new" onClick={toggleSlider}>
                                <FaWallet /> Incomes
                            </Link>
                        </li>
                        <li>
                            <Link to="/bulk-import" onClick={toggleSlider}>
                                <FaFileImport /> Bulk Import
                            </Link>
                        </li>
                        <li>
                            <Link to="/generate-report" onClick={toggleSlider}>
                                <FaFileExport /> Generate Report
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* This div should be moved to your navbar component */}
            <div className="slider-toggle" onClick={toggleSlider}>
                <div className={`toggle-button ${isOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    );
}

export default Slider;