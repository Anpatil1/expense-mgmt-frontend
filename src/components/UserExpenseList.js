// UserExpenseList.js
import React, { useEffect, useState } from 'react';
import AdminexpenseService from '../services/AdminexpenseService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faUser, faCalendarAlt, faTags, faHashtag } from '@fortawesome/free-solid-svg-icons';
import '../Styles/UserTables.css';

function UserExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        if (expenses.length) {
            const table = $('#expenseTable').DataTable({
                responsive: true,
                order: [[0, 'desc']]
            });
            return () => {
                table.destroy();
            };
        }
    }, [expenses]);

    const fetchExpenses = async () => {
        try {
            const response = await AdminexpenseService.getAllExpenses();
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
        <div className="container">
            <h2 className="table-title">
                <FontAwesomeIcon icon={faMoneyBillWave} className="table-icon" />
                Expense List
            </h2>
            <div className="table-container">
                <table id="expenseTable" className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th><FontAwesomeIcon icon={faHashtag} /> ID</th>
                        <th><FontAwesomeIcon icon={faUser} /> User ID</th>
                        <th><FontAwesomeIcon icon={faTags} /> Title</th>
                        <th><FontAwesomeIcon icon={faMoneyBillWave} /> Amount (₹)</th>
                        <th><FontAwesomeIcon icon={faCalendarAlt} /> Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.userId}</td>
                            <td>{expense.title}</td>
                            <td className="amount-cell expense-amount">₹{parseFloat(expense.amount).toFixed(2)}</td>
                            <td>{new Date(expense.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserExpenseList;