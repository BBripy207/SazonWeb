import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../styles/theme';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({ children, onClick, type = 'button', variant = 'primary', size = 'md' }: ButtonProps) {
    return (
        <button onClick={onClick} type={type} style={getStyles(variant, size)}>
            {children}
        </button>
    );
}

const getStyles = (variant: string, size: string): React.CSSProperties => ({
    padding: size === 'sm' ? `${spacing.sm} ${spacing.md}` : size === 'lg' ? `${spacing.md} ${spacing.xl}` : `0.75rem ${spacing.lg}`,
    background: variant === 'primary' ? colors.primary : colors.secondary,
    color: variant === 'primary' ? '#fff' : colors.primaryDark,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.3s',
});
