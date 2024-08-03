import React, { useState } from 'react';
import incomeService from '../services/incomeService';
import '../Styles/Income.css'; // Import the CSS file

function Income() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null); // State to hold error message
    const [success, setSuccess] = useState(''); // State to hold success message

    const handleAddIncome = async () => {
        try {
            const newIncome = {
                title,
                amount,
                date,
                description
            };
            await incomeService.addIncome(newIncome);
            setTitle('');
            setAmount(0);
            setDate('');
            setDescription('');
            setSuccess('Income added successfully!');
            // Trigger email notification here
            // e.g., await emailService.sendIncomeNotification();
        } catch (error) {
            console.error('Error adding income:', error);
            setError('Error adding income. Please try again later.');
        }
    };

    return (
        <div className="income-container1">
            <h2>Add Income</h2>
            <div className="add-income-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="form-control1"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="form-control1"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control1"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows="4"
                    className="form-control1"
                />
                <button onClick={handleAddIncome} className="btn btn-primary">Add Income</button>
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>

    );
}

export default Income;
