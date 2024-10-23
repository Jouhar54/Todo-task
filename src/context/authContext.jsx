import { createContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    const [user, setUser] = useState(() => {
        const access = authTokens?.access || localStorage.getItem('access');
        if (access) {
            try {
                return jwtDecode(access);
            } catch (error) {
                console.error('Invalid token:', error);
                return null;
            }
        }
        return null;
    });

    const [loading, setLoading] = useState(true);

    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
    };

    useEffect(() => {
        if (authTokens) {
            try {
                const decodedUser = jwtDecode(authTokens.access);
                setUser(decodedUser);
            } catch (error) {
                console.error('Error decoding token:', error);
                logoutUser(); 
            }
        }
        setLoading(false);
    }, [authTokens]);

    const context = {
        authTokens,
        setAuthTokens,
        user,
        setUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={context}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
