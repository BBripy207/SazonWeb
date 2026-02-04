import { spacing } from '../../styles/theme';

interface ContainerProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export default function Container({ children, maxWidth = '1200px' }: ContainerProps) {
    return (
        <div style={{ maxWidth, margin: '0 auto', padding: `${spacing.xl} ${spacing.md}` }}>
            {children}
        </div>
    );
}
