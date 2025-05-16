import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import Alert from '../components/ui/alert/Alert';

// Types for alerts
type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertData {
    id: number;
    type: AlertType;
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
}

interface AlertContextType {
    alerts: AlertData[];
    showAlert: (type: AlertType, title: string, message: string, autoClose?: boolean, duration?: number) => void;
    closeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextType>({
    alerts: [],
    showAlert: () => { },
    closeAlert: () => { },
});

export const useAlert = () => useContext(AlertContext);

interface AlertProviderProps {
    children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<AlertData[]>([]);
    const [counter, setCounter] = useState(0);

    const showAlert = useCallback(
        (
            type: AlertType,
            title: string,
            message: string,
            autoClose = true,
            duration = 5000
        ) => {
            const id = counter;
            setCounter(prev => prev + 1);

            const newAlert: AlertData = {
                id,
                type,
                title,
                message,
                autoClose,
                duration,
            };

            setAlerts(prev => [...prev, newAlert]);

            if (autoClose) {
                setTimeout(() => {
                    closeAlert(id);
                }, duration);
            }
        },
        [counter]
    );

    const closeAlert = useCallback((id: number) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, []);

    return (
        <AlertContext.Provider value={{ alerts, showAlert, closeAlert }}>
            {children}

            {/* Alert container */}
            {alerts.length > 0 && (
                <div className="fixed right-0 top-5 z-[999999] flex flex-col gap-3 p-4 md:max-w-md">
                    {alerts.map(alert => (
                        <div key={alert.id} className="relative">
                            <button
                                className="absolute right-1 top-1 text-gray-500 hover:text-gray-800"
                                onClick={() => closeAlert(alert.id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <Alert
                                variant={alert.type}
                                title={alert.title}
                                message={alert.message}
                            />
                        </div>
                    ))}
                </div>
            )}
        </AlertContext.Provider>
    );
};

export default AlertContext; 