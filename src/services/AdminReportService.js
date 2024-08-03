import axios from 'axios';

const API_URL = 'https://expense-mgmt-production.up.railway.app/admin/report/';

class AdminReportService {
    getUsersReport(startDate, endDate) {
        return axios.get(`${API_URL}generate`, {
            params: { startDate, endDate },
            responseType: 'arraybuffer'
        });
    }
}

export default new AdminReportService();
