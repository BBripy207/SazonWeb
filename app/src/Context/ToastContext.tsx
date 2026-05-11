import { createContext, useContext, useState, useCallback } from 'react';
import { colors, spacing, borderRadius, fontSize } from '../styles/theme';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => { } });

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={styles.container}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{ ...styles.toast, ...styles[toast.type] }}>
                        <span style={styles.icon}>{icons[toast.type]}</span>
                        <span style={styles.message}>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);

const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        bottom: spacing.xl,
        right: spacing.xl,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
        zIndex: 9999,
    },
    toast: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        padding: `${spacing.md} ${spacing.lg}`,
        borderRadius: borderRadius.md,
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        fontSize: fontSize.base,
        color: '#fff',
        minWidth: '260px',
        maxWidth: '380px',
        animation: 'fadeInUp 0.25s ease',
    },
    success: {
        background: colors.primaryDark,
    },
    error: {
        background: '#b71c1c',
    },
    info: {
        background: colors.primary,
    },
    icon: {
        fontWeight: 700,
        fontSize: fontSize.lg,
        flexShrink: 0,
    },
    message: {
        lineHeight: '1.4',
    },
};
