import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import { FaChartLine, FaUserCog, FaUserTie, FaRegChartBar, FaWallet, FaFileAlt } from 'react-icons/fa';

function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Smart Expense Management</h1>
                <p className="home-description">
                    Take control of your finances with our powerful tools and insights. Monitor, analyze, and optimize your spending habits effortlessly.
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

            <div className="cards-container">
                <div className="card">
                    <FaChartLine className="card-icon" />
                    <h3>Track Expenses</h3>
                    <p>Easily monitor your spending habits and stay on top of your finances</p>
                </div>
                <div className="card">
                    <FaRegChartBar className="card-icon" />
                    <h3>Analyze Data</h3>
                    <p>Gain valuable insights into your financial patterns and make informed decisions</p>
                </div>
                <div className="card">
                    <FaWallet className="card-icon" />
                    <h3>Budget Planning</h3>
                    <p>Set and manage your budgets to achieve your financial goals effectively</p>
                </div>
                <div className="card">
                    <FaFileAlt className="card-icon" />
                    <h3>Report Generation</h3>
                    <p>Create detailed financial reports to visualize your progress and plan for the future</p>
                </div>
            </div>
        </div>
    );
}

export default Home;