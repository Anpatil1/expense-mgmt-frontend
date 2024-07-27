import React, { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';
import '../Styles/Expense.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editAmount, setEditAmount] = useState(0);
    const [editDate, setEditDate] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await expenseService.getAllExpenses();
                setExpenses(response || []);
                setLoading(false);
            } catch (error) {
                setError('Error fetching expenses.');
                setLoading(false);
            }
        };
        fetchExpenses();
    }, []);

    const handleEditClick = (expense) => {
        setEditingExpense(expense);
        setEditTitle(expense.title);
        setEditAmount(expense.amount);
        setEditDate(expense.date);
        setEditDescription(expense.description);
        setShowEditModal(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await expenseService.deleteExpense(id);
            setExpenses(expenses.filter(expense => expense.id !== id));
            setSuccessMessage('Expense deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setError('Error deleting expense. Please try again later.');
        }
    };

    const handleSaveEdit = async () => {
        try {
            const updatedExpense = {
                id: editingExpense.id, // Ensure the ID is set correctly
                title: editTitle,
                amount: editAmount,
                date: editDate,
                description: editDescription
            };
            await expenseService.updateExpense(updatedExpense.id, updatedExpense); // Pass both ID and data
            setExpenses(expenses.map(expense =>
                expense.id === updatedExpense.id ? updatedExpense : expense
            ));
            setShowEditModal(false);
            setSuccessMessage('Expense updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setError('Error updating expense. Please try again later.');
        }
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setEditTitle(value);
                break;
            case 'amount':
                setEditAmount(value);
                break;
            case 'date':
                setEditDate(value);
                break;
            case 'description':
                setEditDescription(value);
                break;
            default:
                break;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="expense-list-container">
            <h2>Expense List</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map(expense => (
                    <tr key={expense.id}>
                        <td>{expense.id}</td>
                        <td>{expense.title}</td>
                        <td>{expense.description}</td>
                        <td>₹{expense.amount}</td>
                        <td>{expense.date}</td>
                        <td>
                            <button
                                className="btn btn-edit"
                                onClick={() => handleEditClick(expense)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="btn btn-delete"
                                onClick={() => handleDeleteClick(expense.id)}
                            >
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editTitle}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={editAmount}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={editDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={editDescription}
                                onChange={handleInputChange}
                                rows="4"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ExpenseList;
