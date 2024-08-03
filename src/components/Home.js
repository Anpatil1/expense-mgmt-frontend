import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import { FaChartLine, FaUserCog, FaUserTie, FaRegChartBar, FaWallet, FaFileAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Home() {
    const [currentCard, setCurrentCard] = useState(0);
    const cards = [
        { icon: <FaChartLine />, title: "Track Expenses", description: "Easily monitor your spending habits and stay on top of your finances" },
        { icon: <FaRegChartBar />, title: "Analyze Data", description: "Gain valuable insights into your financial patterns and make informed decisions" },
        { icon: <FaWallet />, title: "Budget Planning", description: "Set and manage your budgets to achieve your financial goals effectively" },
        { icon: <FaFileAlt />, title: "Report Generation", description: "Create detailed financial reports to visualize your progress and plan for the future" }
    ];

    const nextCard = () => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    };

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
                <button className="slider-button slider-button-left" onClick={prevCard}>
                    <FaChevronLeft />
                </button>
                <div className="cards-slider" style={{ transform: `translateX(-${currentCard * 330}px)` }}>
                    {cards.map((card, index) => (
                        <div key={index} className="card">
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
                <button className="slider-button slider-button-right" onClick={nextCard}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}

export default Home;