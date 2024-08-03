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
import AdminexpenseService from '../services/AdminexpenseService';
import AdminincomeService from '../services/AdminincomeService';
import userService from '../services/userService'; // Assuming you have this service
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/AdminDashboard.css';
import {FaBalanceScale, FaMoneyBillWave} from "react-icons/fa";
import {FaUsers} from "react-icons/fa6";

function AdminDashboard() {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [balance, setBalance] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [expensesResponse, incomesResponse] = await Promise.all([
                    AdminexpenseService.getAllExpenses(),
                    AdminincomeService.getAllIncomes()
                ]);

                // console.log('Expenses Data:', expensesResponse.data);
                // console.log('Incomes Data:', incomesResponse.data);

                const preparedMonthlyData = prepareMonthlyData(expensesResponse.data, incomesResponse.data);
                const preparedYearlyData = prepareYearlyData(expensesResponse.data, incomesResponse.data);

                setMonthlyData(preparedMonthlyData);
                setYearlyData(preparedYearlyData);

                const totalExpenses = calculateTotal(expensesResponse.data);
                const totalIncomes = calculateTotal(incomesResponse.data);
                setTotalExpenses(totalExpenses);
                setTotalIncomes(totalIncomes);
                updateBalance(totalExpenses, totalIncomes);

                // Fetch total users after expenses and incomes
                fetchTotalUsers();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchTotalUsers = async () => {
        try {
            const token = localStorage.getItem('user');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await userService.getAllUsers(token);
            // console.log('Fetched Users:', response); // Log the full response for debugging

            // Assuming response.data is the array of users
            const users = response.data || response; // Adjust based on your actual API response structure

            if (Array.isArray(users)) {
                setTotalUsers(users.length);
            } else {
                console.error('Unexpected response format:', users);
                setTotalUsers(0); // Set default value or handle accordingly
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error('Access denied. Insufficient permissions.');
                // Handle unauthorized access (e.g., redirect to login)
            } else {
                console.error('Error fetching users:', error);
            }
            setTotalUsers(0); // Set default value or handle error state
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
        <div className="admin-dashboard">
            <h2 className="dashboard-title">Admin Dashboard</h2>
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
                <div className="stat-card users">
                    <FaUsers className="stat-icon" />
                    <div className="stat-content">
                        <h3>Total Users</h3>
                        <p>{totalUsers}</p>
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
            <Link to="/admin/users" className="view-users-btn">
                <FaUsers /> View Users
            </Link>
        </div>
    );
}

export default AdminDashboard;
