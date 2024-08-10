import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../Styles/Profile.css';
import { FaUser, FaCamera, FaEnvelope, FaUserShield } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';

function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [editing, setEditing] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [imageError, setImageError] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`/api/users/username/${username}`);
                if (response.data) {
                    setUser(response.data);
                    setEmail(response.data.email);
                    setRole(response.data.role);
                    setPhotoUrl(response.data.photoUrl);
                    setError(null);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.response?.status === 403 ? 'Unauthorized: Please log in again.' : 'Error fetching user data. Please try again later.');
            }
        };

        if (username) {
            fetchUser();
        } else {
            setError('Username is undefined');
        }
    }, [username]);

    const handleUpdatePassword = async () => {
        try {
            await axiosInstance.post(`/api/users/update-password`, { username: user.username, newPassword });
            setPasswordUpdated(true);
            setNewPassword('');
            setError(null);
        } catch (error) {
            console.error('Error updating password:', error);
            setError(error.response?.data?.message || 'Error updating password. Please try again later.');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axiosInstance.put(`/api/users/${user.id}`, { email, role });
            if (response.status === 200) {
                setUser(response.data);
                setEditing(false);
                setError(null);
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.response?.data?.message || 'Error updating profile. Please try again later.');
        }
    };

    const handlePhotoUpload = async () => {
        if (!photoFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('photo', photoFile);

        try {
            setIsUploading(true);
            setError(null);
            const response = await axiosInstance.post(`/api/users/upload-photo/${user.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                setPhotoUrl(response.data.photoUrl);
                localStorage.setItem('profilePhotoUrl', response.data.photoUrl);
                setPhotoFile(null);
                setUser({ ...user, photoUrl: response.data.photoUrl });
            } else {
                throw new Error('Failed to upload photo');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError(error.response?.data?.message || 'Error uploading photo. Please try again later.');
        } finally {
            setIsUploading(false);
        }
    };

    const toggleEdit = () => setEditing(!editing);

    const handleImageError = () => {
        console.error('Error loading image:', photoUrl);
        setImageError(true);
    };

    if (error) return <div className="profile-error">{error}</div>;
    if (!user) return <div className="profile-loading">Loading...</div>;

    const imageUrl = photoUrl ? `https://expensemanagementapplication-7izlsyxp.b4a.run/api/users/photos/${photoUrl}` : null;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-photo-container">
                        {imageUrl && !imageError ? (
                            <img
                                src={imageUrl}
                                alt="Profile"
                                className="profile-photo"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="profile-photo-placeholder">
                                <FaUser />
                            </div>
                        )}
                        {editing && (
                            <label htmlFor="photo-upload" className="photo-upload-label">
                                <FaCamera />
                                <input
                                    id="photo-upload"
                                    type="file"
                                    onChange={(e) => setPhotoFile(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                    </div>
                    <h1 className="profile-name">{user.username}</h1>
                    <p className="profile-role"><FaUserShield /> {user.role}</p>
                </div>
                <div className="profile-details">
                    <div className="profile-info">
                        <FaEnvelope className="profile-info-icon" />
                        <div className="profile-info-label">Email</div>
                        <div className="profile-info-value">{user.email}</div>
                    </div>
                    <div className="profile-info">
                        <FaUserShield className="profile-info-icon" />
                        <div className="profile-info-label">Role</div>
                        <div className="profile-info-value">{user.role}</div>
                    </div>
                </div>
                <div className="profile-actions">
                    {editing ? (
                        <>
                            {photoFile && (
                                <div className="photo-upload-info">
                                    <span>{photoFile.name}</span>
                                    <button
                                        className="profile-button"
                                        onClick={handlePhotoUpload}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Uploading...' : 'Upload Photo'}
                                    </button>
                                </div>
                            )}
                            <div className="profile-info">
                                <MdPassword className="profile-info-icon" />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="profile-input"
                                />
                            </div>
                            <button className="profile-button" onClick={handleUpdatePassword}>Update Password</button>
                            <button className="profile-button" onClick={handleUpdateProfile}>Save Profile</button>
                            <button className="profile-button cancel" onClick={toggleEdit}>Cancel</button>
                        </>
                    ) : (
                        <button className="profile-button" onClick={toggleEdit}>Edit Profile</button>
                    )}
                </div>
                {passwordUpdated && <p className="password-updated">Password updated successfully!</p>}
                {error && <div className="profile-error">{error}</div>}
            </div>
        </div>
    );
}

export default Profile;
