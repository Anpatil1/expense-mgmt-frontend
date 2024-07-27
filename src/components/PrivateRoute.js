import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';


const PrivateRoute = ({ isLoggedIn, isAdmin, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (isAdmin === undefined) {
        return children; // If isAdmin is not required, allow access
    }

    if (isAdmin && !authService.getCurrentUser()?.role === 'ADMIN') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
