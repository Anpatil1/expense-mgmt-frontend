import axios from 'axios';

const API_URL = 'https://expensemanagementapplication-7izlsyxp.b4a.run/api/admin'; // Change to your API URL

const getAllExpenses = async () => {
    try {
        const response = await axios.get(`${API_URL}/expenses`);
        return response; // Return the full response object
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const getExpenseById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/expenses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const createExpense = async (expenseDTO) => {
    try {
        const response = await axios.post(`${API_URL}/expenses`, expenseDTO);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const updateExpense = async (id, expenseDTO) => {
    try {
        const response = await axios.put(`${API_URL}/expenses/${id}`, expenseDTO);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const deleteExpense = async (id) => {
    try {
        await axios.delete(`${API_URL}/expenses/${id}`);
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const AdminexpenseService = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};

export default AdminexpenseService;
