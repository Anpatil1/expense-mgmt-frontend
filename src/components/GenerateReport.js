import React, { useState } from 'react';
import axios from '../axiosInstance';  // Adjust the path as per your project structure

function GenerateReport() {
    const [errorMessage, setErrorMessage] = useState('');

    const generateCombinedReport = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reports/combined', {
                responseType: 'blob', // Treat response as binary data
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error generating combined report:', error);
            setErrorMessage('Error generating combined report.');
        }
    };

    return (
        <div className="container">
            <h2>Generate Report</h2>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <button className="btn btn-primary" onClick={generateCombinedReport}>Generate Combined PDF</button>
        </div>
    );
}

export default GenerateReport;
