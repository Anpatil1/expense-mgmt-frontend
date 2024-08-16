import React, { useState } from 'react';
import axios from '../axiosInstance';
import { FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import '../Styles/GenerateReport.css';

function GenerateReport() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const generateReport = async () => {
        try {
            const response = await axios.get('https://expense-backend-1-hnul.onrender.com/api/reports/generate', {
                params: {
                    startDate: startDate,
                    endDate: endDate
                },
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error generating report:', error);
            setErrorMessage('Error generating report.');
        }
    };

    return (
        <div className="generate-report-container">
            <h2 className="title"><FaFileAlt className="icon" /> Generate Report</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="date-inputs">
                <div className="input-group">
                    <label htmlFor="startDate">
                        <FaCalendarAlt className="calendar-icon" /> Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="date-input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="endDate">
                        <FaCalendarAlt className="calendar-icon" /> End Date:
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="date-input"
                    />
                </div>
            </div>
            <button onClick={generateReport} className="generate-btn">
                Generate Report
            </button>
        </div>
    );
}

export default GenerateReport;