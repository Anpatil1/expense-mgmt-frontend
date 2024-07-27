import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Logout({ setIsLoggedIn }) {
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        setIsLoggedIn(false);
        navigate('Home');
    }, [navigate, setIsLoggedIn]);

    return null;
}

export default Logout;
