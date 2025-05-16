import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface TooltipProps {
    content: string | ReactNode;
    children: ReactNode;
    position?: 'top' | 'right' | 'bottom' | 'left';
    className?: string;
    delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = 'top',
    className = '',
    delay = 300,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Position classes
    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2',
        right: 'left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2',
    };

    // Arrow position classes
    const arrowClasses = {
        top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent',
        right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-t-transparent border-b-transparent border-r-transparent',
        bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent',
        left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-t-transparent border-b-transparent border-l-transparent',
    };

    // Handle mouseenter and mouseleave
    const handleMouseEnter = () => {
        setIsMouseOver(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (!isMouseOver) setIsVisible(false);
        }, 100);
    };

    // Clean up timer on component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}

            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-50 whitespace-nowrap rounded bg-gray-800 py-1.5 px-3 text-xs font-medium text-white dark:bg-gray-700 ${positionClasses[position]} ${className}`}
                >
                    {content}
                    <div
                        className={`absolute w-0 h-0 border-4 border-gray-800 dark:border-gray-700 ${arrowClasses[position]}`}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip; 