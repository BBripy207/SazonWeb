import { colors, spacing, fontSize, fontWeight } from '../../styles/theme';

interface PageTitleProps {
    children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
    return <h1 style={styles.title}>{children}</h1>;
}

const styles: Record<string, React.CSSProperties> = {
    title: {
        fontSize: fontSize.xxxl,
        marginBottom: spacing.xl,
        fontWeight: fontWeight.bold,
        color: colors.primaryDark,
    },
};
