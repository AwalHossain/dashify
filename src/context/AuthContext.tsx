/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
// import { useLogoutMutation } from '../services/auth'; // Not using it directly here anymore

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void; // Function to call after successful token storage by mutation
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => { console.warn("Login function from AuthContext called before AuthProvider initialized"); },
    logout: async () => { console.warn("Logout function from AuthContext called before AuthProvider initialized"); },
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
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const loginContext = useCallback(() => {
        setIsAuthenticated(true);
    }, [setIsAuthenticated]);

    const handleLogout = useCallback(async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    }, [setIsAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: loginContext, logout: handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 