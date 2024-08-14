import axios from 'axios';

const API_URL = 'https://expensemanagementapplication-7izlsyxp.b4a.run/api/auth';

const login = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username: username,
            password: password,
            role: role
        });

        if (response.data.token) {
            const userData = {
                token: response.data.token,
                username: response.data.username,
                userId: response.data.userId, // Extract user ID from response
                role: role
            };
            localStorage.setItem('user', JSON.stringify(userData));
        }

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            username: username,
            email: email,
            password: password
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const initiatePasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, null, { params: { email } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const resetPassword = async (email, otp, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, {
            email: email,
            otp: otp,
            newPassword: newPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

const authService = {
    getCurrentUser,
    login,
    signup,
    logout,
    initiatePasswordReset,
    resetPassword
};

export default authService;