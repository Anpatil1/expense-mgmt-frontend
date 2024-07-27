import axiosInstance from '../axiosInstance';

const incomeService = {
    getAllIncomes: async () => {
        try {
            const response = await axiosInstance.get('/api/incomes');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getIncomeById: async (id) => {
        try {
            const response = await axiosInstance.get(`/api/incomes/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addIncome: async (income) => {
        try {
            const response = await axiosInstance.post('/api/incomes', income);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateIncome: async (income) => {
        try {
            const response = await axiosInstance.put('/api/incomes', income);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteIncome: async (id) => {
        try {
            await axiosInstance.delete(`/api/incomes/${id}`);
        } catch (error) {
            throw error;
        }
    },
    bulkUploadIncomes: async (formData) => {
        try {
            const response = await axiosInstance.post('/api/incomes/bulk-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};


export default incomeService;
