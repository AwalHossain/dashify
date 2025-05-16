import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Login } from '../services/auth';

export default function useAuthLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await Login(email, password);
            navigate('/');
            return true;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
        error,
        setError
    };
} 