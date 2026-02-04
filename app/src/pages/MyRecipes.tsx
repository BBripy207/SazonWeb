import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import Grid from '../components/layout/Grid';
import Box from '../components/ui/Box';
import Heading from '../components/ui/Heading';
import Section from '../components/ui/Section';
import { History, Heart } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';

const mockSaved = [
    {
        id: '1',
        title: 'Mostachones',
        image: logo,
        time: 30,
        difficulty: 'Fácil' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 12,
    },
    {
        id: '4',
        title: 'Pizza Italiana',
        image: logo,
        time: 60,
        difficulty: 'Media' as const,
        category: 'Internacional',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
];

const mockRecent = [
    {
        id: '3',
        title: 'Costillas BBQ',
        image: logo,
        time: 120,
        difficulty: 'Difícil' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 6,
    },
];

export default function MyRecipes() {
    return (
        <Container>
            <PageTitle>Mi Recetario</PageTitle>

            <Section style={styles.section}>
                <Box style={styles.sectionHeader}>
                    <Heart size={24} />
                    <Heading level={2} style={styles.sectionTitle}>Recetas Guardadas</Heading>
                </Box>
                <Grid columns="recipes" gap={spacing.lg}>
                    {mockSaved.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </Grid>
            </Section>

            <Section style={styles.section}>
                <Box style={styles.sectionHeader}>
                    <History size={24} />
                    <Heading level={2} style={styles.sectionTitle}>Vistas Recientemente</Heading>
                </Box>
                <Grid columns="recipes" gap={spacing.lg}>
                    {mockRecent.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </Grid>
            </Section>
        </Container>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        marginBottom: spacing.xxl,
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: spacing.lg,
        color: colors.primary,
    },
    sectionTitle: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.semibold,
        margin: 0,
        color: colors.primaryDark,
    },
};
