import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/userService'; // Assuming you have this service

const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await userService.getUserById(userId);
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="container mt-5">
            <h2>User Details</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    {/* Add more user details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetails;
