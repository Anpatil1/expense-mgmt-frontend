import React, { useState, useEffect } from 'react';
import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import ExpenseList from './components/ExpenseList';
import IncomeList from './components/IncomeList';
import Expense from './components/Expense';

import Income from './components/Income';
import GenerateReport from './components/GenerateReport';
import Slider from './components/Slider';
import AdminSlider from './components/AdminSlider';

import UserList from "./components/UserList";
import UserIncomeList from "./components/UserIncomeList";
import UserExpenseList from "./components/UserExpenseList";
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import BulkImport from './components/BulkImport';
import PasswordReset from './components/PasswordReset';
import authService from './services/authService';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function useAuth() {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        isAdmin: false,
        isUser: false,
        loading: true,
        username: '',
        photoUrl: '',
    });

    const updateAuthState = () => {
        const user = authService.getCurrentUser();
        if (user && user.token) {
            setAuthState({
                isLoggedIn: true,
                isAdmin: user.role === 'ADMIN',
                isUser: user.role === 'USER',
                loading: false,
                username: user.username,
                photoUrl: user.photoUrl || ''
            });
        } else {
            setAuthState({
                isLoggedIn: false,
                isAdmin: false,
                isUser: false,
                loading: false,
                username: '',
                photoUrl: '',
            });
        }
    };

    useEffect(() => {
        updateAuthState();
    }, []);

    return {
        ...authState,
        setIsLoggedIn: (value) => setAuthState(prev => ({ ...prev, isLoggedIn: value })),
        updateAuthState
    };
}

function App() {
    const { isLoggedIn, isAdmin, isUser, loading, username,photoUrl,setIsLoggedIn, updateAuthState } = useAuth();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
            updateAuthState();
        }
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="App">
                {isLoggedIn && <NavBar setIsLoggedIn={setIsLoggedIn} username={username} photoUrl={photoUrl} />
                }

                {isLoggedIn && isAdmin && <AdminSlider />}
                {isLoggedIn && isUser && <Slider />}

                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to={isAdmin ? "/admin-dashboard" : "/dashboard"} /> : <Home />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} updateAuthState={updateAuthState} />} />
                    <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} updateAuthState={updateAuthState} />} />
                    <Route path="/adminlogin" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} updateAuthState={updateAuthState} />} />
                    <Route path="/resetPass" element={<PasswordReset />} />
                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} updateAuthState={updateAuthState} />} />

                    <Route path="/dashboard" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/expenses" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <ExpenseList />
                        </PrivateRoute>
                    } />
                    <Route path="/incomes" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <IncomeList />
                        </PrivateRoute>
                    } />
                    <Route path="/expenses/new" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Expense />
                        </PrivateRoute>
                    } />
                    <Route path="/incomes/new" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Income />
                        </PrivateRoute>
                    } />

                    <Route path="/bulk-import" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <BulkImport />
                        </PrivateRoute>
                    } />
                    <Route path="/profile/:username" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="/generate-report" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <GenerateReport />
                        </PrivateRoute>
                    } />

                    <Route path="/admin-dashboard" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <AdminDashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/users" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <UserList />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/expenses" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <UserExpenseList />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/expenses/:expenseId" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <Expense />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/incomes" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <UserIncomeList />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/incomes/:incomeId" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <Income />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/reports" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                            <GenerateReport />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;