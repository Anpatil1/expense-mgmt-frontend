import axiosInstance from '../axiosInstance';

const fetchUserData = async () => {
    try {
        const response = await axiosInstance.get('/api/user/profile');
        console.log('User Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export default fetchUserData;
