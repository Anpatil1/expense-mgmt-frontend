import axios from 'axios';

const API_URL = 'https://expense-backend-1-hnul.onrender.com/admin/report/';

class AdminReportService {
    async getUsersReport(startDate, endDate) {
        try {
            const response = await axios.get(`${API_URL}generate`, {
                params: { startDate, endDate },
                responseType: 'arraybuffer'
            });
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.data instanceof ArrayBuffer) {
                    // If the error response is an ArrayBuffer, it might contain error details
                    const decoder = new TextDecoder('utf-8');
                    const errorMessage = decoder.decode(error.response.data);
                    throw new Error(`Server Error: ${errorMessage}`);
                } else {
                    throw new Error(`Server Error: ${error.response.status} - ${error.response.statusText}`);
                }
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response received from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Error: ${error.message}`);
            }
        }
    }
}

export default new AdminReportService();