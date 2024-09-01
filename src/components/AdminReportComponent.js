import React, { useState } from 'react';
import AdminReportService from '../services/AdminReportService';
import '../Styles/AdminReportComponent.css';

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

            // Check if the response is valid before creating the blob
            if (response.data instanceof ArrayBuffer) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'UsersReport.pdf';
                link.click();
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Error details:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(`Server error: ${err.response.status} - ${err.response.data}`);
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response received from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`Error generating report: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-report-container">
            <div className="report-card">
                <h2 className="report-title">Admin Reports</h2>
                <div className="date-inputs">
                    <div className="input-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className={`generate-btn ${loading || !startDate || !endDate ? 'disabled' : ''}`}
                    onClick={generateUsersReport}
                    disabled={loading || !startDate || !endDate}
                >
                    {loading ? 'Generating...' : 'Generate Users Report'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default AdminReportComponent;