import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../Styles/Profile.css';
import { FaUser } from 'react-icons/fa';

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
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Error updating password. Please try again later.');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axiosInstance.put(`/api/users/${user.id}`, { email, role });
            setUser(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile. Please try again later.');
        }
    };

    const handlePhotoUpload = async (event) => {
        event.preventDefault();
        if (!photoFile) return;

        const formData = new FormData();
        formData.append('photo', photoFile);

        try {
            const response = await axiosInstance.post(`/api/users/upload-photo/${user.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setPhotoUrl(response.data.photoUrl);
            localStorage.setItem('profilePhotoUrl', response.data.photoUrl);
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError('Error uploading photo. Please try again later.');
        }
    };

    const toggleEdit = () => setEditing(!editing);

    const handleImageError = () => {
        console.error('Error loading image:', imageUrl);
        setImageError(true);
    };


    if (error) return <div className="profile-error">{error}</div>;
    if (!user) return <div className="profile-loading">Loading...</div>;

    const imageUrl = photoUrl ? `http://localhost:8080/api/users/photos/${photoUrl}` : null;
    console.log("Image URL:", imageUrl); // Log the image URL for debugging

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
                    </div>
                    <h1 className="profile-name">{user.username}</h1>
                    <p className="profile-role">{user.role}</p>
                </div>
                <div className="profile-details">
                    <div className="profile-info">
                        <div className="profile-info-label">Email</div>
                        <div className="profile-info-value">{user.email}</div>
                    </div>
                    <div className="profile-info">
                        <div className="profile-info-label">Role</div>
                        <div className="profile-info-value">{user.role}</div>
                    </div>
                </div>
                <div className="profile-actions">
                    {editing ? (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="file"
                                onChange={(e) => setPhotoFile(e.target.files[0])}
                            />
                            <button className="profile-button" onClick={handleUpdateProfile}>Save Profile</button>
                            <button className="profile-button" onClick={handlePhotoUpload}>Upload Photo</button>
                            {!passwordUpdated && (
                                <>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button className="profile-button" onClick={handleUpdatePassword}>Update Password</button>
                                </>
                            )}
                        </>
                    ) : (
                        <button className="profile-button" onClick={toggleEdit}>Edit Profile</button>
                    )}
                    {passwordUpdated && <p className="password-updated">Password updated successfully!</p>}
                </div>
            </div>
        </div>
    );
}

export default Profile;
