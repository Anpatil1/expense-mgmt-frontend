import React, { useState } from 'react';
import AdminReportService from '../services/AdminReportService';
import '../Styles/AdminReportComponent.css'; // Make sure to create this CSS file

const AdminReportComponent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const generateUsersReport = async () => {
        if (!startDate || !endDate) {
            setError('Please enter both start and end dates');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await AdminReportService.getUsersReport(startDate, endDate);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'UsersReport.pdf';
            link.click();
        } catch (err) {
            setError('Error generating users report');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-report-container">
            <h2>Admin Reports</h2>
            <div className="report-form">
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={generateUsersReport}>
                    {loading ? 'Generating...' : 'Generate Users Report'}
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default AdminReportComponent;
