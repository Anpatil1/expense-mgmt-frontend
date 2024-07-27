import React, { useEffect, useState } from 'react';
import AdminincomeService from '../services/AdminincomeService'; // Adjust the import path as necessary

function UserIncomeList() {
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await AdminincomeService.getAllIncomes();
            console.log('API Response:', response); // Log full response
            if (Array.isArray(response.data)) {
                setIncomes(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setIncomes([]); // Default to empty array
            }
        } catch (error) {
            console.error('Error fetching incomes:', error.message); // Improved error logging
            setIncomes([]); // Default to empty array in case of error
        }
    };

    return (
        <div className="container mt-5">
            <h2>Income List</h2>
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
                {incomes.map(income => (
                    <tr key={income.id}>
                        <td>{income.id}</td>
                        <td>{income.userId}</td>
                        <td>{income.title}</td>
                        <td>{income.amount}</td>
                        <td>{income.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserIncomeList;
