import axios from 'axios';

const API_URL = 'https://expensemanagementapplication-7izlsyxp.b4a.run/admin/report/';

class AdminReportService {
    getUsersReport(startDate, endDate) {
        return axios.get(`${API_URL}generate`, {
            params: { startDate, endDate },
            responseType: 'arraybuffer'
        });
    }
}

export default new AdminReportService();
