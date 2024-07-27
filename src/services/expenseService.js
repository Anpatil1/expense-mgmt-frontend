import axiosInstance from '../axiosInstance';

const expenseService = {
    getAllExpenses: async () => {
        try {
            const response = await axiosInstance.get('/expenses');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getExpenseById: async (id) => {
        try {
            const response = await axiosInstance.get(`/expenses/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addExpense: async (expense) => {
        try {
            const response = await axiosInstance.post('/expenses', expense);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateExpense: async (id, expense) => { // This expects two arguments: id and the updated expense data
        try {
            const response = await axiosInstance.put(`/expenses/${id}`, expense);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteExpense: async (id) => {
        try {
            await axiosInstance.delete(`/expenses/${id}`);
        } catch (error) {
            throw error;
        }
    },
    bulkUploadExpenses: async (formData) => {
        try {
            const response = await axiosInstance.post('/expenses/bulk-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    sendConfirmationEmail: async (expenseId) => {
        try {
            const response = await axiosInstance.post(`/expenses/${expenseId}/send-confirmation-email`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default expenseService;
