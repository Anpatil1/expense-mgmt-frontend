import React, { useEffect, useState } from 'react';
import AdminexpenseService from '../services/AdminexpenseService'; // Adjust the import path as necessary

function UserExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await AdminexpenseService.getAllExpenses();
            console.log('API Response:', response); // Log the entire response
            if (response && response.data && Array.isArray(response.data)) {
                setExpenses(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setExpenses([]);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error.message);
            setExpenses([]);
        }
    };



    return (
        <div className="container mt-5">
            <h2>Expense List</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Title</th>
                    <th>Amount (₹)</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map(expense => (
                    <tr key={expense.id}>
                        <td>{expense.id}</td>
                        <td>{expense.userId}</td>
                        <td>{expense.title}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserExpenseList;
