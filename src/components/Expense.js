import React, { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';
import authService from '../services/authService';
import '../Styles/Expense.css';

function Expense() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        console.log('Current user:', currentUser);
        setUser(currentUser);
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            console.log('User state:', user);

            if (!user) {
                throw new Error('User not authenticated');
            }

            if (!user.username) {
                throw new Error('Username is missing');
            }

            const newExpense = {
                title,
                amount,
                date: new Date(date).toISOString(),
                description,
                userId: user.username // Use username instead of id
            };

            console.log('New expense object:', newExpense);

            const response = await expenseService.addExpense(newExpense);
            console.log('Expense added successfully:', response);

            setSuccessMessage('Expense added successfully!');

            // Clear the form fields
            setTitle('');
            setAmount(0);
            setDate('');
            setDescription('');

            setTimeout(() => setSuccessMessage(''), 3000);

            if (response && response.data && response.data.id) {
                await expenseService.sendConfirmationEmail(response.data.id);
            } else {
                console.error('Error: Response does not contain required data.');
            }

        } catch (error) {
            console.error('Error adding expense:', error);
            setErrorMessage(`Failed to add expense: ${error.message}`);
        }
    };

    if (!user) {
        return <div>Loading user information... If this persists, please log in again.</div>;
    }

    return (
        <div className="expense-container">
            <h2>Add Expense</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleAddExpense}>
                {/* Form fields remain the same */}
                <div className="form-group1">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="form-control1"
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control1"
                        required
                    />
                </div>
                <div className="form-group1">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn-primary">Add Expense</button>
            </form>
        </div>
    );
}

export default Expense;