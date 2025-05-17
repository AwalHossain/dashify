import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/spinner/Spinner';

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>
} 