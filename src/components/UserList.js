import React, { useEffect, useState } from 'react';
import userService from '../services/userService'; // Adjust the import path as necessary

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers(); // Adjust if your service is named differently
            setUsers(response); // Directly use the response if it's an array
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Ensure users is always an array
        }
    };

    return (
        <div className="container mt-5">
            <h2>User List</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
