import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import backgroundImage from '../assests/img.svg';
import { FaChartLine, FaUserCog, FaUserTie, FaRegChartBar } from 'react-icons/fa';

function Home() {
    return (
        <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="insight-cards">
                <div className="insight-card">
                    <FaChartLine className="insight-icon" />
                    <h3>Track Expenses</h3>
                    <p>Monitor your spending habits</p>
                </div>
                <div className="insight-card">
                    <FaRegChartBar className="insight-icon" />
                    <h3>Analyze Data</h3>
                    <p>Get insights on your finances</p>
                </div>
            </div>

            <div className="home-content">
                <h1 className="home-title">Smart Expense Management</h1>
                <p className="home-description">
                    Take control of your finances with our powerful tools and insights.
                </p>
                <div className="home-buttons">
                    <Link to="/login" className="btn btn-primary home-button">
                        <FaUserCog /> User Login
                    </Link>
                    <Link to="/Adminlogin" className="btn btn-secondary home-button">
                        <FaUserTie /> Admin Login
                    </Link>
                </div>
                <Link to="/signup" className="signup-link">New user? Sign up here</Link>
            </div>

            <div className="feature-cards">
                <div className="feature-card">
                    <h4>Budget Planning</h4>
                    <p>Set and manage your budgets</p>
                </div>
                <div className="feature-card">
                    <h4>Report Generation</h4>
                    <p>Create detailed financial reports</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
