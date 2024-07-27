import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import expenseService from '../services/expenseService';
import incomeService from '../services/incomeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/dashboard.css';
import { FaBalanceScale, FaMoneyBillWave } from "react-icons/fa";
// Import custom CSS for styling

function Dashboard() {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [balance, setBalance] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchIncomes();
    }, []);

    useEffect(() => {
        updateBalance(totalExpenses, totalIncomes);
    }, [totalExpenses, totalIncomes]);

    useEffect(() => {
        // Fetch expenses and incomes, then prepare and set monthly data
        Promise.all([expenseService.getAllExpenses(), incomeService.getAllIncomes()])
            .then(([expensesData, incomesData]) => {
                const preparedMonthlyData = prepareMonthlyData(expensesData, incomesData);
                setMonthlyData(preparedMonthlyData);
                const preparedYearlyData = prepareYearlyData(expensesData, incomesData);
                setYearlyData(preparedYearlyData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const fetchExpenses = async () => {
        try {
            const expenses = await expenseService.getAllExpenses();
            const total = calculateTotal(expenses);
            setTotalExpenses(total);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const fetchIncomes = async () => {
        try {
            const incomes = await incomeService.getAllIncomes();
            const total = calculateTotal(incomes);
            setTotalIncomes(total);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        }
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.amount, 0);
    };

    const updateBalance = (expensesTotal, incomesTotal) => {
        setBalance(incomesTotal - expensesTotal);
    };

    const prepareMonthlyData = (expenses, incomes) => {
        const monthlyData = [];
        for (let i = 0; i < 12; i++) {
            const monthName = getMonthName(i);
            const expensesTotal = calculateTotalByMonth(expenses, i);
            const incomesTotal = calculateTotalByMonth(incomes, i);
            monthlyData.push({
                name: monthName,
                expenses: expensesTotal,
                incomes: incomesTotal
            });
        }
        return monthlyData;
    };

    const prepareYearlyData = (expenses, incomes) => {
        const yearlyData = [];
        const currentYear = new Date().getFullYear();
        for (let year = 2023; year <= currentYear; year++) {
            const expensesTotal = calculateTotalByYear(expenses, year);
            const incomesTotal = calculateTotalByYear(incomes, year);
            yearlyData.push({
                name: year.toString(),
                expenses: expensesTotal,
                incomes: incomesTotal
            });
        }
        return yearlyData;
    };

    const getMonthName = (index) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[index];
    };

    const calculateTotalByMonth = (items, monthIndex) => {
        return items
            .filter(item => new Date(item.date).getMonth() === monthIndex)
            .reduce((total, item) => total + item.amount, 0);
    };

    const calculateTotalByYear = (items, year) => {
        return items
            .filter(item => new Date(item.date).getFullYear() === year)
            .reduce((total, item) => total + item.amount, 0);
    };

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Expense Management Dashboard</h2>
            <div className="dashboard-stats">
                <div className="stat-card expenses">
                    <FaMoneyBillWave className="stat-icon" />
                    <div className="stat-content">
                        <h3>Total Expenses</h3>
                        <p>{totalExpenses} ₹</p>
                    </div>
                </div>
                <div className="stat-card incomes">
                    <FaMoneyBillWave className="stat-icon" />
                    <div className="stat-content">
                        <h3>Total Incomes</h3>
                        <p>{totalIncomes} ₹</p>
                    </div>
                </div>
                <div className="stat-card balance">
                    <FaBalanceScale className="stat-icon" />
                    <div className="stat-content">
                        <h3>Balance</h3>
                        <p>{balance} ₹</p>
                    </div>
                </div>
            </div>
            <div className="dashboard-charts">
                <div className="chart-container">
                    <h3 className="chart-title">Monthly Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="expenses" stroke="#ff6b6b" />
                            <Line type="monotone" dataKey="incomes" stroke="#4ecdc4" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-container">
                    <h3 className="chart-title">Yearly Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expenses" fill="#ff6b6b" />
                            <Bar dataKey="incomes" fill="#4ecdc4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-actions">
                <Link to="/expenses" className="view-btn">
                    <FaMoneyBillWave /> View Expenses
                </Link>
                <Link to="/incomes" className="view-btn">
                    <FaMoneyBillWave /> View Incomes
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
