import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import {
    FaChartLine, FaUserCog, FaUserTie, FaRegChartBar, FaWallet, FaFileAlt,
    FaChevronLeft, FaChevronRight, FaArrowRight, FaCheck, FaShieldAlt,
    FaBolt, FaUsers, FaGlobe, FaChartBar, FaRocket
} from 'react-icons/fa';

function Home() {
    const [currentCard, setCurrentCard] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Original cards data - keeping the core content
    const cards = [
        {
            icon: <FaChartLine />,
            title: "Track Expenses",
            description: "Easily monitor your spending habits and stay on top of your finances"
        },
        {
            icon: <FaRegChartBar />,
            title: "Analyze Data",
            description: "Gain valuable insights into your financial patterns and make informed decisions"
        },
        {
            icon: <FaWallet />,
            title: "Budget Planning",
            description: "Set and manage your budgets to achieve your financial goals effectively"
        },
        {
            icon: <FaFileAlt />,
            title: "Report Generation",
            description: "Create detailed financial reports to visualize your progress and plan for the future"
        }
    ];

    const benefits = [
        { icon: <FaShieldAlt />, text: "Secure & Private" },
        { icon: <FaBolt />, text: "Lightning Fast" },
        { icon: <FaUsers />, text: "Multi-User Support" },
        { icon: <FaGlobe />, text: "Global Access" }
    ];

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "1M+", label: "Transactions" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % cards.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [cards.length]);

    const nextCard = () => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    };

    return (
        <div className="modern-home">
            {/* Animated Background */}
            <div className="bg-animation">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            {/* Navigation Dots */}
            <div className="nav-dots">
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>

            {/* Hero Section */}
            <section className={`hero ${isVisible ? 'visible' : ''}`}>
                <div className="hero-container">
                    <div className="hero-left">
                        <div className="badge">
                            <FaChartBar />
                            <span>Smart Financial Management</span>
                        </div>

                        <h1 className="hero-title">
                            Smart Expense
                            <span className="highlight">Management</span>
                        </h1>

                        <p className="hero-subtitle">
                            Take control of your finances with our powerful tools and insights.
                            Monitor, analyze, and optimize your spending habits effortlessly.
                        </p>

                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <div className="benefit-icon">{benefit.icon}</div>
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="cta-section">
                            <Link to="/login" className="btn-primary">
                                <FaUserCog />
                                User Login
                                <FaArrowRight className="arrow" />
                            </Link>
                            <Link to="/Adminlogin" className="btn-secondary">
                                <FaUserTie />
                                Admin Login
                            </Link>
                        </div>

                        <div className="signup-prompt">
                            <span>New user? </span>
                            <Link to="/signup" className="signup-link">Sign up here</Link>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="dashboard-preview">
                            <div className="preview-header">
                                <div className="preview-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="preview-title">Expense Dashboard</div>
                            </div>
                            <div className="preview-content">
                                <div className="chart-area">
                                    <div className="chart-lines">
                                        <div className="line line-1"></div>
                                        <div className="line line-2"></div>
                                        <div className="line line-3"></div>
                                    </div>
                                </div>
                                <div className="stats-preview">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="stat-card">
                                            <div className="stat-number">{stat.number}</div>
                                            <div className="stat-label">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="floating-elements">
                            <div className="float-item float-1">
                                <FaWallet />
                            </div>
                            <div className="float-item float-2">
                                <FaChartLine />
                            </div>
                            <div className="float-item float-3">
                                <FaRocket />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Powerful Features</h2>
                        <p>Everything you need to manage your finances effectively</p>
                    </div>

                    <div className="features-carousel">
                        <button className="carousel-btn prev-btn" onClick={prevCard}>
                            <FaChevronLeft />
                        </button>

                        <div className="carousel-container">
                            <div
                                className="carousel-track"
                                style={{ transform: `translateX(-${currentCard * 100}%)` }}
                            >
                                {cards.map((card, index) => (
                                    <div key={index} className="feature-card">
                                        <div className="card-icon">
                                            {card.icon}
                                        </div>
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                        <div className="card-footer">
                                            <span>Learn More</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="carousel-btn next-btn" onClick={nextCard}>
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="carousel-indicators">
                        {cards.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentCard ? 'active' : ''}`}
                                onClick={() => setCurrentCard(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <div className="container">
                    <div className="trust-content">
                        <div className="trust-text">
                            <h3>Trusted by thousands of users worldwide</h3>
                            <p>Join our growing community of smart financial managers</p>
                        </div>
                        <div className="trust-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="trust-stat">
                                    <div className="trust-number">{stat.number}</div>
                                    <div className="trust-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;