import axios from 'axios';

const API_URL = 'https://expense-backend-ts5x.onrender.com/api/admin'; // Change to your API URL

const getAllIncomes = async () => {
    try {
        const response = await axios.get(`${API_URL}/incomes`);
        return response; // Return the full response object
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const getIncomeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/incomes/${id}`);
        return response; // Return the full response object
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const createIncome = async (incomeDTO) => {
    try {
        const response = await axios.post(`${API_URL}/incomes`, incomeDTO);
        return response; // Return the full response object
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const updateIncome = async (id, incomeDTO) => {
    try {
        const response = await axios.put(`${API_URL}/incomes/${id}`, incomeDTO);
        return response; // Return the full response object
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const deleteIncome = async (id) => {
    try {
        await axios.delete(`${API_URL}/incomes/${id}`);
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const AdminincomeService = {
    getAllIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome
};

export default AdminincomeService;
