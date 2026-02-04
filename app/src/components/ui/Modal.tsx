import { colors, spacing, borderRadius } from '../../styles/theme';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {title && <h2 style={styles.title}>{title}</h2>}
                {children}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        background: colors.background,
        padding: spacing.xl,
        borderRadius: borderRadius.lg,
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
    title: {
        margin: `0 0 ${spacing.lg}`,
        color: colors.primaryDark,
        fontSize: '1.75rem',
        fontWeight: 700,
    },
};
