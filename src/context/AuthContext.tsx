/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    logout: () => { },
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);


    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        window.location.href = '/signin';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 