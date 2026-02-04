import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import Box from '../components/ui/Box';
import Heading from '../components/ui/Heading';
import { Filter } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';

const mockRecipes = [
    {
        id: '1',
        title: 'Pastel de Chocolate',
        image: logo,
        time: 45,
        difficulty: 'Media' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 8,
    },
    {
        id: '2',
        title: 'Sopa de Verduras',
        image: logo,
        time: 30,
        difficulty: 'Fácil' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
    {
        id: '3',
        title: 'Tacos al Pastor',
        image: logo,
        time: 60,
        difficulty: 'Media' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 6,
    },
    {
        id: '4',
        title: 'Galletas de Avena',
        image: logo,
        time: 25,
        difficulty: 'Fácil' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 12,
    },
];

export default function Explore() {
    const [searchParams] = useSearchParams();
    const [difficulty, setDifficulty] = useState('');
    const query = searchParams.get('q') || '';

    return (
        <Container>
            <Box style={styles.header}>
                <Heading level={1} style={styles.title}>
                    {query ? `Resultados para "${query}"` : 'Explorar Recetas'}
                </Heading>
                <Box style={styles.filters}>
                    <Filter size={20} />
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Todas</option>
                        <option value="Fácil">Fácil</option>
                        <option value="Media">Media</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </Box>
            </Box>

            <Box style={styles.grid}>
                {mockRecipes
                    .filter((r) => !difficulty || r.difficulty === difficulty)
                    .map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
            </Box>
        </Container>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    title: {
        fontSize: fontSize.xxxl,
        margin: 0,
        fontWeight: fontWeight.semibold,
        color: colors.primaryDark,
    },
    filters: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        color: colors.primary,
    },
    select: {
        padding: `${spacing.sm} ${spacing.md}`,
        border: `1px solid ${colors.border}`,
        borderRadius: '4px',
        fontSize: fontSize.base,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: spacing.lg,
    },
};
