import axiosInstance from '../axiosInstance';

const getProfile = async (username) => {
    try {
        const response = await axiosInstance.get(`/api/users/username/${username}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


const updateProfile = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const uploadPhoto = async (id, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);

    try {
        const response = await axiosInstance.post(`/api/users/upload-photo/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const ProfileService = {
    getProfile,
    updateProfile,
    uploadPhoto
};

export default ProfileService;
