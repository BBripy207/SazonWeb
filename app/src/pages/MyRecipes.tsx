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
import { useAuth } from '../Context/AuthContext';

export default function MyRecipes() {
    const { user } = useAuth();
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchSavedRecipes();
        } else {
            setLoading(false);
        }
    }, [user]); // 3. Re-run if user logs in while on this page

    async function fetchSavedRecipes() {
        if (!user) return;
        setLoading(true);
        
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
            .eq('user_id', user.id); // 4. Filter by current user ID

        if (error) {
            console.error('Error fetching favorites:', error.message);
        } else if (data) {
            // Filter out any nulls in case a favorited recipe was deleted
            const recipes = data
                .map((f: any) => f.recipes)
                .filter(Boolean) as Recipe[];
            setSavedRecipes(recipes);
        }
        setLoading(false);
    }

    // 5. Show message if not logged in
    if (!user) {
        return (
            <Container>
                <PageTitle>Mi Recetario</PageTitle>
                <Section style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <Heart size={48} color={colors.primary} style={{ marginBottom: spacing.md }} />
                    <Heading level={2}>Inicia sesión para ver tus favoritos</Heading>
                    <p style={{ color: colors.textLight }}>
                        Guarda las recetas que más te gusten para tenerlas siempre a mano.
                    </p>
                </Section>
            </Container>
        );
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
