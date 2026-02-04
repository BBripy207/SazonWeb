import { colors, spacing, borderRadius, fontSize } from '../../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, ...props }: InputProps) {
    return (
        <div style={styles.container}>
            {label && <label style={styles.label}>{label}</label>}
            <input {...props} style={styles.input} />
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
    },
    label: {
        fontWeight: 600,
        fontSize: fontSize.base,
        color: colors.primaryDark,
    },
    input: {
        padding: '0.75rem',
        border: `2px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        fontSize: fontSize.base,
        transition: 'border-color 0.3s',
    },
};
