import React, { useState } from 'react';
import expenseService from '../services/expenseService'; // Ensure the path is correct
import '../Styles/Expense.css'; // Import the CSS file for styling

function Expense() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(''); // Ensure this matches the format expected by your backend
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            // Ensure userId is valid
            if (!userId || isNaN(userId)) {
                throw new Error('Invalid userId format');
            }

            const newExpense = {
                title,
                amount,
                date: new Date(date).toISOString(), // Ensure date format is consistent
                description,
                userId: parseInt(userId, 10) // Ensure userId is in the expected format (e.g., number)
            };

            // Add the expense
            const response = await expenseService.addExpense(newExpense);
            console.log('Expense added successfully:', response);

            // Set success message
            setSuccessMessage('Expense added successfully!');

            // Clear the form fields
            setTitle('');
            setAmount(0);
            setDate('');
            setDescription('');
            setUserId(''); // Clear userId field

            // Hide the success message after a few seconds
            setTimeout(() => setSuccessMessage(''), 3000);

            // Ensure the response has the required data
            if (response && response.data && response.data.id) {
                // Send confirmation email
                await expenseService.sendConfirmationEmail(response.data.id);
            } else {
                console.error('Error: Response does not contain required data.');
            }

        } catch (error) {
            console.error('Error adding expense:', error);
            setErrorMessage(`Failed to add expense: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div className="container expense-container">
            <h2>Add Expense</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleAddExpense}>
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Expense</button>
            </form>
        </div>
    );
}

export default Expense;
