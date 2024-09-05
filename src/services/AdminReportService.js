import axios from 'axios';

const API_URL = 'https://expense-backend-1-hnul.onrender.com/admin/report/';

class AdminReportService {
    async getUsersReport(startDate, endDate) {
        try {
            const response = await axios.get(`${API_URL}generate`, {
                params: { startDate, endDate },
                responseType: 'blob'
            });

            const contentType = response.headers['content-type'];
            if (contentType === 'application/pdf') {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                return blob;
            } else {
                // If the response is not a PDF, it's likely an error message
                const text = await new Response(response.data).text();
                throw new Error(text);
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = await this.parseErrorResponse(error.response);
                throw new Error(`Server Error: ${errorMessage}`);
            } else if (error.request) {
                throw new Error('No response received from server. Please try again later.');
            } else {
                throw new Error(`Error: ${error.message}`);
            }
        }
    }

    async parseErrorResponse(response) {
        if (response.data instanceof Blob) {
            try {
                const text = await response.data.text();
                return text;
            } catch {
                return 'Unable to parse error response';
            }
        }
        return response.data || response.statusText;
    }
}

export default new AdminReportService();