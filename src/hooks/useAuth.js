import React from 'react';
import authService from '../services/authService';

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [role, setRole] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [username, setUsername] = React.useState('');

    React.useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);
            setRole(user.role);
        } else {
            setIsLoggedIn(false);
            setRole('');
        }
        setLoading(false);
    }, []);

    React.useEffect(() => {
        const handleStorageChange = () => {
            const user = authService.getCurrentUser();
            if (user) {
                setIsLoggedIn(true);
                setUsername(user.username);
                setRole(user.role);
            } else {
                setIsLoggedIn(false);
                setRole('');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return { isLoggedIn, role, loading, username, setIsLoggedIn };
}

export default useAuth;
