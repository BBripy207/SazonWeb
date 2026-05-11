import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import Grid from '../components/layout/Grid';
import Box from '../components/ui/Box';
import Heading from '../components/ui/Heading';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Heart, ChefHat, Trash2 } from 'lucide-react';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import type { Recipe } from '../types';
import { useAuth } from '../Context/AuthContext';
import { useToast } from '../Context/ToastContext';

type Tab = 'saved' | 'mine';

export default function MyRecipes() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<Tab>('saved');
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | number | null>(null);
    const [confirmId, setConfirmId] = useState<string | number | null>(null);

    useEffect(() => {
        if (user) {
            fetchSavedRecipes();
            fetchMyRecipes();
        } else {
            setLoading(false);
        }
    }, [user]);

    async function fetchSavedRecipes() {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('favorites')
            .select(`recipes ( id, title, image_url, preparation_time, difficulty, categories ( name ), users ( username ) )`)
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching favorites:', error.message);
        } else if (data) {
            const recipes = data.map((f: any) => f.recipes).filter(Boolean) as Recipe[];
            setSavedRecipes(recipes);
        }
        setLoading(false);
    }

    async function fetchMyRecipes() {
        if (!user) return;
        const { data, error } = await supabase
            .from('recipes')
            .select('id, title, image_url, preparation_time, difficulty, categories ( name ), users ( username )')
            .eq('user_id', user.id)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching my recipes:', error.message);
        } else if (data) {
            setMyRecipes(data as Recipe[]);
        }
    }

    async function handleDelete(recipeId: string | number) {
        setDeletingId(recipeId);
        // Delete in order: ingredients, steps, favorites, then recipe
        await supabase.from('ingredients').delete().eq('recipe_id', recipeId);
        await supabase.from('steps').delete().eq('recipe_id', recipeId);
        await supabase.from('favorites').delete().eq('recipe_id', recipeId);
        const { error } = await supabase.from('recipes').delete().eq('id', recipeId);

        if (error) {
            showToast('Error al eliminar la receta', 'error');
        } else {
            setMyRecipes(prev => prev.filter(r => r.id !== recipeId));
            showToast('Receta eliminada permanentemente', 'success');
        }
        setDeletingId(null);
        setConfirmId(null);
    }

    if (!user) {
        return (
            <Container>
                <PageTitle>Mi Recetario</PageTitle>
                <Section style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <Heart size={48} color={colors.primary} style={{ marginBottom: spacing.md }} />
                    <Heading level={2}>Inicia sesión para ver tu recetario</Heading>
                    <p style={{ color: colors.textLight }}>
                        Guarda recetas favoritas y sube las tuyas propias.
                    </p>
                </Section>
            </Container>
        );
    }

    return (
        <Container>
            <PageTitle>Mi Recetario</PageTitle>

            {/* Tabs */}
            <Box style={styles.tabs}>
                <button
                    style={{ ...styles.tab, ...(activeTab === 'saved' ? styles.tabActive : {}) }}
                    onClick={() => setActiveTab('saved')}
                >
                    <Heart size={18} /> Guardadas
                </button>
                <button
                    style={{ ...styles.tab, ...(activeTab === 'mine' ? styles.tabActive : {}) }}
                    onClick={() => setActiveTab('mine')}
                >
                    <ChefHat size={18} /> Mis Recetas
                </button>
            </Box>

            {/* Tab: Saved */}
            {activeTab === 'saved' && (
                <Section style={styles.section}>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : savedRecipes.length === 0 ? (
                        <p style={{ color: colors.textLight }}>Aún no tienes recetas guardadas.</p>
                    ) : (
                        <Grid columns="recipes" gap={spacing.lg}>
                            {savedRecipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </Grid>
                    )}
                </Section>
            )}

            {/* Tab: My Recipes */}
            {activeTab === 'mine' && (
                <Section style={styles.section}>
                    {myRecipes.length === 0 ? (
                        <p style={{ color: colors.textLight }}>Aún no has subido ninguna receta.</p>
                    ) : (
                        <Grid columns="recipes" gap={spacing.lg}>
                            {myRecipes.map(recipe => (
                                <Box key={recipe.id} style={styles.cardWrapper}>
                                    <RecipeCard recipe={recipe} />
                                    <Box style={styles.deleteArea}>
                                        {confirmId === recipe.id ? (
                                            <Box style={styles.confirmRow}>
                                                <span style={styles.confirmText}>¿Eliminar para siempre?</span>
                                                <button
                                                    style={styles.confirmBtn}
                                                    disabled={deletingId === recipe.id}
                                                    onClick={() => handleDelete(recipe.id)}
                                                >
                                                    {deletingId === recipe.id ? 'Eliminando...' : 'Sí, eliminar'}
                                                </button>
                                                <button style={styles.cancelBtn} onClick={() => setConfirmId(null)}>
                                                    Cancelar
                                                </button>
                                            </Box>
                                        ) : (
                                            <button style={styles.deleteBtn} onClick={() => setConfirmId(recipe.id)}>
                                                <Trash2 size={15} /> Eliminar
                                            </button>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                    )}
                </Section>
            )}
        </Container>
    );
}

const styles: Record<string, React.CSSProperties> = {
    tabs: {
        display: 'flex',
        gap: spacing.sm,
        marginBottom: spacing.xl,
        borderBottom: `2px solid ${colors.border}`,
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        padding: `${spacing.sm} ${spacing.lg}`,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        color: colors.textLight,
        borderBottom: '2px solid transparent',
        marginBottom: '-2px',
        borderRadius: `${borderRadius.sm} ${borderRadius.sm} 0 0`,
        transition: 'color 0.2s',
    },
    tabActive: {
        color: colors.primaryDark,
        borderBottom: `2px solid ${colors.primaryDark}`,
    },
    section: {
        marginBottom: spacing.xxl,
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    deleteArea: {
        marginTop: spacing.xs,
    },
    deleteBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        width: '100%',
        padding: `${spacing.xs} ${spacing.sm}`,
        border: `1px solid #e53935`,
        borderRadius: borderRadius.sm,
        background: 'transparent',
        color: '#e53935',
        fontSize: fontSize.sm,
        cursor: 'pointer',
        justifyContent: 'center',
        transition: 'background 0.2s',
    },
    confirmRow: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        flexWrap: 'wrap',
    },
    confirmText: {
        fontSize: fontSize.sm,
        color: '#e53935',
        fontWeight: fontWeight.semibold,
        flex: 1,
    },
    confirmBtn: {
        padding: `${spacing.xs} ${spacing.sm}`,
        background: '#e53935',
        color: '#fff',
        border: 'none',
        borderRadius: borderRadius.sm,
        fontSize: fontSize.sm,
        cursor: 'pointer',
        fontWeight: fontWeight.semibold,
    },
    cancelBtn: {
        padding: `${spacing.xs} ${spacing.sm}`,
        background: colors.backgroundLight,
        color: colors.text,
        border: 'none',
        borderRadius: borderRadius.sm,
        fontSize: fontSize.sm,
        cursor: 'pointer',
    },
};
