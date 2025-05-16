import React from 'react';

interface RibbonProps {
    text: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
}

const Ribbon: React.FC<RibbonProps> = ({
    text,
    position = 'top-right',
    color = 'primary',
    className = '',
}) => {
    // Position classes
    const positionClasses = {
        'top-left': 'top-2 left-2',
        'top-right': 'top-2 right-2',
        'bottom-left': 'bottom-2 left-2',
        'bottom-right': 'bottom-2 right-2',
    };

    // Color classes
    const colorClasses = {
        primary: 'bg-blue-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-400 text-white',
    };

    return (
        <div
            className={`absolute z-10 px-2 py-1 text-xs font-semibold rounded ${positionClasses[position]} ${colorClasses[color]} ${className}`}
        >
            {text}
        </div>
    );
};

export default Ribbon; 