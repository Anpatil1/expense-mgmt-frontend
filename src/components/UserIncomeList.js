// UserIncomeList.js
import React, { useEffect, useState } from 'react';
import AdminincomeService from '../services/AdminincomeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faUser, faCalendarAlt, faTags, faHashtag } from '@fortawesome/free-solid-svg-icons';
import '../Styles/UserTables.css';

function UserIncomeList() {
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        fetchIncomes();
    }, []);

    useEffect(() => {
        if (incomes.length) {
            const table = $('#incomeTable').DataTable({
                responsive: true,
                order: [[0, 'desc']]
            });
            return () => {
                table.destroy();
            };
        }
    }, [incomes]);

    const fetchIncomes = async () => {
        try {
            const response = await AdminincomeService.getAllIncomes();
            if (Array.isArray(response.data)) {
                setIncomes(response.data);
            } else {
                setIncomes([]);
            }
        } catch (error) {
            setIncomes([]);
        }
    };

    return (
        <div className="container">
            <h2 className="table-title">
                <FontAwesomeIcon icon={faMoneyBillWave} className="table-icon" />
                Income List
            </h2>
            <div className="table-container">
                <table id="incomeTable" className="table table-hover table-striped">
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
                    {incomes.map(income => (
                        <tr key={income.id}>
                            <td>{income.id}</td>
                            <td>{income.userId}</td>
                            <td>{income.title}</td>
                            <td className="amount-cell income-amount">₹{parseFloat(income.amount).toFixed(2)}</td>
                            <td>{new Date(income.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserIncomeList;