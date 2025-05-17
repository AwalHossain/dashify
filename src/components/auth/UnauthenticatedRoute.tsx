import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/spinner/Spinner';


export default function UnauthenticatedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    if (isAuthenticated) {
        // User is authenticated, redirect them from this public-only route
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
} 