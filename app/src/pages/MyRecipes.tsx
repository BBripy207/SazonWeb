import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import Grid from '../components/layout/Grid';
import Box from '../components/ui/Box';
import Heading from '../components/ui/Heading';
import Section from '../components/ui/Section';
import { History, Heart } from 'lucide-react';
import mostachon from '../assets/images/mostachon.png';
import costillas from '../assets/images/costillas bbq.png';
import pizza from '../assets/images/pizza italiana.png';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import type { Recipe } from '../types'; 

const mockSaved = [
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

const mockRecent = [
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
];

export default function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    async function fetchSavedRecipes() {
        setLoading(true);
        
        // 2. Query the 'favorites' table and JOIN the 'recipes' and 'categories'
        const { data, error } = await supabase
            .from('favorites')
            .select(`
                recipes (
                    id,
                    title,
                    image_url,
                    preparation_time,
                    difficulty,
                    categories ( name )
                )
            `)
            // .eq('user_id', currentUserId) // You'll add Auth logic later!

        if (error) {
            console.error('Error fetching favorites:', error.message);
        } else if (data) {
            // extract nested recipe objects from the response
            const recipes = data.map((f: any) => f.recipes) as Recipe[];
            setSavedRecipes(recipes);
        }
        setLoading(false);
    }

    return (
        <Container>
            <PageTitle>Mi Recetario</PageTitle>

            <Section style={styles.section}>
                <Box style={styles.sectionHeader}>
                    <Heart size={24} />
                    <Heading level={2} style={styles.sectionTitle}>Recetas Guardadas</Heading>
                </Box>
                
                {loading ? (
                    <p>Cargando tus recetas...</p>
                ) : (
                    <Grid columns="recipes" gap={spacing.lg}>
                        {savedRecipes.map((recipe) => (
                            <RecipeCard 
                                key={recipe.id} 
                                recipe={recipe}
                            />
                        ))}
                    </Grid>
                )}
            </Section>

            {/* Repeat similar logic for Recent recipes or keep mock for now */}
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
