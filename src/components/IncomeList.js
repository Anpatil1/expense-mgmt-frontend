import React, { useState, useEffect } from 'react';
import incomeService from '../services/incomeService';
import '../Styles/Income.css'; // Import the CSS file
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import unique icons for edit and delete
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components for modal and form

function IncomeList() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAmount, setEditAmount] = useState(0);
    const [editDate, setEditDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await incomeService.getAllIncomes();
                setIncomes(response || []);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchIncomes();
    }, []);

    const handleEditClick = (income) => {
        setSelectedIncome(income);
        setEditTitle(income.title);
        setEditAmount(income.amount);
        setEditDate(income.date);
        setShowEditModal(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await incomeService.deleteIncome(id);
            setIncomes(incomes.filter(income => income.id !== id));
            setSuccessMessage('Income deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
        } catch (error) {
            setError('Error deleting income. Please try again later.');
        }
    };

    const handleSaveEdit = async () => {
        try {
            const updatedIncome = {
                ...selectedIncome,
                title: editTitle,
                amount: editAmount,
                date: editDate
            };
            await incomeService.updateIncome(updatedIncome.id, updatedIncome);
            setIncomes(incomes.map(income =>
                income.id === updatedIncome.id ? updatedIncome : income
            ));
            setShowEditModal(false);
            setSuccessMessage('Income updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
        } catch (error) {
            setError('Error updating income. Please try again later.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching incomes: {error.message}</div>;
    }

    return (
        <div className="income-list-container">
            <h2>Income List</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {incomes.map(income => (
                    <tr key={income.id}>
                        <td>{income.id}</td>
                        <td>{income.title}</td>
                        <td>{income.amount}</td>
                        <td>{income.date}</td>
                        <td>
                            <button
                                className="btn btn-edit"
                                onClick={() => handleEditClick(income)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="btn btn-delete"
                                onClick={() => handleDeleteClick(income.id)}
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
                    <Modal.Title>Edit Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="editAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="editDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
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

export default IncomeList;
