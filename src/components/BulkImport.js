import React, { useState } from 'react';
import incomeService from '../services/incomeService';
import expenseService from '../services/expenseService';
import { FaFileUpload, FaMoneyBillWave, FaReceipt } from 'react-icons/fa';
import '../Styles/BulkImport.css';

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
                await incomeService.bulkUploadIncomes(formData);
            } else if (type === 'expense') {
                await expenseService.bulkUploadExpenses(formData);
            }
            setSuccess('File uploaded successfully!');
            setError(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again later.');
            setSuccess(null);
        }
    };

    return (
        <div className="bulk-import-container">
            <h2 className="title"><FaFileUpload className="icon" /> Bulk Import</h2>
            <div className="upload-section">
                <label htmlFor="file-upload" className="custom-file-upload">
                    <FaFileUpload className="upload-icon" />
                    {file ? file.name : 'Choose a file'}
                </label>
                <input id="file-upload" type="file" onChange={handleFileChange} />
                <div className="button-group">
                    <button onClick={() => handleUpload('income')} className="upload-btn income-btn">
                        <FaMoneyBillWave className="btn-icon" /> Upload Incomes
                    </button>
                    <button onClick={() => handleUpload('expense')} className="upload-btn expense-btn">
                        <FaReceipt className="btn-icon" /> Upload Expenses
                    </button>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
}

export default BulkImport;