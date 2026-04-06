import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import Grid from '../components/layout/Grid';
import Box from '../components/ui/Box';
import Heading from '../components/ui/Heading';
import { Filter } from 'lucide-react';
import mostachon from '../assets/images/mostachon.png';
import enchiladas from '../assets/images/enchiladas_suizas_.png';
import costillas from '../assets/images/costillas bbq.png';
import pizza from '../assets/images/pizza italiana.png';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';
import { supabase } from '../supabaseClient';
import type { Recipe } from '../types';

const mockRecipes = [
    {
        id: '1',
        title: 'Mostachones',
        image: mostachon,
        time: 30,
        difficulty: 'Fácil' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 12,
    },
    {
        id: '2',
        title: 'Enchiladas Suizas',
        image: enchiladas,
        time: 45,
        difficulty: 'Media' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
    {
        id: '3',
        title: 'Costillas BBQ',
        image: costillas,
        time: 120,
        difficulty: 'Difícil' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 6,
    },
    {
        id: '4',
        title: 'Pizza Italiana',
        image: pizza,
        time: 60,
        difficulty: 'Media' as const,
        category: 'Internacional',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
];

export default function Explore() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState('');
    
    // Get the search query from the URL (e.g., ?q=tacos)
    const query = searchParams.get('q') || '';

    useEffect(() => {
        fetchRecipes();
        // The [query, difficulty] dependency array tells React:
        // "Re-run this function every time the user types or changes the filter"
    }, [query, difficulty]);

    async function fetchRecipes() {
        setLoading(true);
        
        let supabaseQuery = supabase
            .from('recipes')
            .select(`
                id,
                title,
                image_url,
                preparation_time,
                difficulty,
                categories ( name )
            `);

        // 1. Filter by Search Query (title contains string - Case Insensitive)
        if (query) {
            supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
        }

        // 2. Filter by Difficulty
        if (difficulty) {
            supabaseQuery = supabaseQuery.eq('difficulty', difficulty);
        }

        const { data, error } = await supabaseQuery;

        if (error) {
            console.error('Error fetching recipes:', error.message);
        } else {
            setRecipes(data as Recipe[]);
        }
        setLoading(false);
    }

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
                        <option value="">Todas las dificultades</option>
                        <option value="Fácil">Fácil</option>
                        <option value="Media">Media</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </Box>
            </Box>

            {loading ? (
                <p>Buscando recetas...</p>
            ) : (
                <Grid columns="recipes" gap={spacing.lg}>
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <p>No se encontraron recetas con esos criterios.</p>
                    )}
                </Grid>
            )}
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
};
