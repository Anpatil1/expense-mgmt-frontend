import React, { useState } from 'react';
import incomeService from '../services/incomeService';
import expenseService from '../services/expenseService';

function BulkImport() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (type) => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            if (type === 'income') {
                await incomeService.bulkUploadIncomes(formData); // Calls incomeService to upload incomes
            } else if (type === 'expense') {
                await expenseService.bulkUploadExpenses(formData); // Calls expenseService to upload expenses
            }
            setSuccess('File uploaded successfully!');
            setError(null);
        } catch (error) {
            console.error('Error uploading file:', error); // Log the complete error object
            setError('Error uploading file. Please try again later.');
            setSuccess(null);
        }
    };

    return (
        <div className="container">
            <h2>Bulk Import</h2>
            <div className="mb-4">
                <input type="file" onChange={handleFileChange} className="form-control mb-2" />
                <button onClick={() => handleUpload('income')} className="btn btn-primary">Upload Incomes</button>
                <button onClick={() => handleUpload('expense')} className="btn btn-primary ml-2">Upload Expenses</button>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
                {success && <div className="alert alert-success mt-2">{success}</div>}
            </div>
        </div>
    );
}

export default BulkImport;
