import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUserTag, faHashtag } from '@fortawesome/free-solid-svg-icons';
import '../Styles/UserTables.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length) {
            const table = $('#userTable').DataTable({
                responsive: true,
                order: [[0, 'desc']]
            });
            return () => {
                table.destroy();
            };
        }
    }, [users]);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    return (
        <div className="container">
            <h2 className="table-title">
                <FontAwesomeIcon icon={faUser} className="table-icon" />
                User List
            </h2>
            <div className="table-container">
                <table id="userTable" className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th><FontAwesomeIcon icon={faHashtag} /> ID</th>
                        <th><FontAwesomeIcon icon={faUser} /> Username</th>
                        <th><FontAwesomeIcon icon={faEnvelope} /> Email</th>
                        <th><FontAwesomeIcon icon={faUserTag} /> Role</th>
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
        </div>
    );
}

export default UserList;