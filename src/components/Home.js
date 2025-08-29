import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

function Home() {
    const [currentCard, setCurrentCard] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Updated cards data with emoji symbols instead of React Icons
    const cards = [
        {
            symbol: "📊",
            title: "Track Expenses",
            description: "Easily monitor your spending habits and stay on top of your finances"
        },
        {
            symbol: "📈",
            title: "Analyze Data",
            description: "Gain valuable insights into your financial patterns and make informed decisions"
        },
        {
            symbol: "💰",
            title: "Budget Planning",
            description: "Set and manage your budgets to achieve your financial goals effectively"
        },
        {
            symbol: "📋",
            title: "Report Generation",
            description: "Create detailed financial reports to visualize your progress and plan for the future"
        }
    ];

    const benefits = [
        { symbol: "🛡", text: "Secure & Private" },
        { symbol: "⚡", text: "Lightning Fast" },
        { symbol: "👥", text: "Multi-User Support" },
        { symbol: "🌐", text: "Global Access" }
    ];

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "1M+", label: "Transactions" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
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
            </div>

            {/* Hero Section */}
            <section className={`hero ${isVisible ? 'visible' : ''}`}>
                <div className="hero-container">
                    <div className="hero-left">
                        <div className="badge">
                            <span className="badge-symbol">✨</span>
                            <span>New Features Available</span>
                        </div>

                        <h1 className="hero-title">
                            Smart <span className="highlight">Financial</span> Management for Everyone
                        </h1>

                        <p className="hero-subtitle">
                            Take control of your finances with our intelligent expense tracking platform.
                            Monitor spending, analyze patterns, and achieve your financial goals with ease.
                        </p>

                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <div className="benefit-icon">
                                        <span>{benefit.symbol}</span>
                                    </div>
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="cta-section">
                            <Link to="/login" className="btn-primary">
                                <span>Get Started</span>
                                <span className="arrow">→</span>
                            </Link>
                            <Link to="/signup" className="btn-secondary">
                                <span>Learn More</span>
                            </Link>
                        </div>

                        <div className="signup-prompt">
                            <span>New to ExpenseTracker? </span>
                            <Link to="/signup" className="signup-link">
                                Create your free account
                            </Link>
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
                                <span className="preview-title">Dashboard</span>
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
                                    <div className="stat-card">
                                        <div className="stat-number">$2,500</div>
                                        <div className="stat-label">This Month</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-number">128</div>
                                        <div className="stat-label">Transactions</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="floating-elements">
                            <div className="float-item float-1">
                                <span>💰</span>
                            </div>
                            <div className="float-item float-2">
                                <span>📊</span>
                            </div>
                            <div className="float-item float-3">
                                <span>⚡</span>
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
                            <span>‹</span>
                        </button>

                        <div className="carousel-container">
                            <div className="carousel-track" style={{ transform: `translateX(-${currentCard * 100}%)` }}>
                                {cards.map((card, index) => (
                                    <div key={index} className="feature-card">
                                        <div className="card-icon">
                                            <span>{card.symbol}</span>
                                        </div>
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                        <div className="card-footer">
                                            <span>Learn more</span>
                                            <span>→</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="carousel-btn next-btn" onClick={nextCard}>
                            <span>›</span>
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
                            <h3>Trusted by thousands worldwide</h3>
                            <p>Join our growing community of users who have taken control of their financial future</p>
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