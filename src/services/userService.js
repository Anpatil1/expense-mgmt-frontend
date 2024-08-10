import axios from 'axios';

const API_URL = 'https://expensemanagementapplication-7izlsyxp.b4a.run/api/admin'; // Change to your API URL

const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data; // Ensure this is returning the correct format
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const createUser = async (userDTO) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userDTO);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const updateUser = async (id, userDTO) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, userDTO);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const userService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default userService;
