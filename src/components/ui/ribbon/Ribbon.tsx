import React from 'react';

interface RibbonProps {
    text: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
}

const Ribbon: React.FC<RibbonProps> = ({
    text,
    color = 'primary',
    className = '',
}) => {
    // Color classes
    const colorClasses = {
        primary: 'bg-blue-600 text-white border-blue-700',
        success: 'bg-green-600 text-white border-green-700',
        warning: 'bg-amber-500 text-white border-amber-600',
        error: 'bg-red-500 text-white border-red-600',
        info: 'bg-sky-500 text-white border-sky-600',
    };

    return (
        <div
            className={`inline-block px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider border-b border-r shadow-sm ${colorClasses[color]} ${className}`}
        >
            {text}
        </div>
    );
};

export default Ribbon; 