import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../styles/theme';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean; 
}

export default function Button({ children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false }: ButtonProps) {
    return (
        <button onClick={onClick} type={type} style={getStyles(variant, size, disabled)}>
            {children}
        </button>
    );
}

const getStyles = (variant: string, size: string, disabled: boolean): React.CSSProperties => ({
    padding: size === 'sm' ? `${spacing.sm} ${spacing.md}` : size === 'lg' ? `${spacing.md} ${spacing.xl}` : `0.75rem ${spacing.lg}`,
    background: disabled ? '#ccc' : (variant === 'primary' ? colors.primary : colors.secondary),
    color: variant === 'primary' ? '#fff' : colors.primaryDark,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
});
