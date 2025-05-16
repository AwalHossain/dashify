import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    color = 'primary',
    className = '',
}) => {
    // Size classes
    const sizeClasses = {
        sm: 'h-5 w-5',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    // Color classes
    const colorClasses = {
        primary: 'border-blue-500 border-b-transparent',
        secondary: 'border-gray-500 border-b-transparent',
        success: 'border-green-500 border-b-transparent',
        warning: 'border-yellow-500 border-b-transparent',
        error: 'border-red-500 border-b-transparent',
    };

    return (
        <div
            className={`inline-block animate-spin rounded-full border-4 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner; 