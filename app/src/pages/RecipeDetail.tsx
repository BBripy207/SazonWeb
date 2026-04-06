import { Clock, Users, BookMarked, Star, Trash2 } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import mostachon from '../assets/images/mostachon.png';
import Button from '../components/ui/Button';
import Box from '../components/ui/Box';
import Text from '../components/ui/Text';
import Heading from '../components/ui/Heading';
import Image from '../components/ui/Image';
import List from '../components/ui/List';
import ListItem from '../components/ui/ListItem';
import Section from '../components/ui/Section';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../Context/AuthContext';

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>(); // Get ID from URL /receta/:id
    const { user } = useAuth(); 
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchFullRecipe();
            if (user) checkIsFavorited();
        }
    }, [id, user]);

    async function fetchFullRecipe() {
        setLoading(true);
        // This is the "Mega-Join"
        const { data, error } = await supabase
            .from('recipes')
            .select(`
                *,
                categories ( name ),
                ingredients ( ingredient_name, quantity, unit ),
                preparation_steps ( step_number, description ),
                comments ( 
                    id, 
                    comment, 
                    rating, 
                    created_at, 
                    users ( username, profile_image ) 
                )
            `)
            .eq('id', id)
            .single(); // Tells Supabase we expect exactly one object, not an array

        if (error) {
            console.error("Error fetching recipe:", error);
        } else {
            setRecipe(data);
        }
        setLoading(false);
    }

   async function checkIsFavorited() {
        if (!user || !id) return;
        
        // Use .maybeSingle() to avoid the "PGRST116" error when no record exists
        const { data, error } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user.id)
            .eq('recipe_id', id)
            .maybeSingle(); 
        
        if (error) {
            console.error("Error checking favorite status:", error.message);
            return;
        }

        // If data exists, it means the recipe IS already favorited
        setIsFavorited(!!data);
    }

    async function toggleFavorite() {
        if (!user) {
            alert("Debes iniciar sesión para guardar recetas");
            return;
        }

        setFavLoading(true);
        if (isFavorited) {
            // REMOVE from favorites
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('recipe_id', id);
            
            if (!error) setIsFavorited(false);
        } else {
            // ADD to favorites
            const { error } = await supabase
                .from('favorites')
                .insert([{ user_id: user.id, recipe_id: id }]);
            
            if (!error) setIsFavorited(true);
        }
        setFavLoading(false);
    }

    if (loading) return <Box style={{ padding: '2rem' }}>Cargando receta...</Box>;
    if (!recipe) return <Box style={{ padding: '2rem' }}>Receta no encontrada.</Box>;

    return (
        <Box style={styles.page}>
            {/* HERO SECTION */}
            <Box style={styles.hero}>
                <Image src={recipe.image_url} alt={recipe.title} style={styles.heroImage} />
                <Box style={styles.heroOverlay}>
                    <Heading level={1} style={styles.title}>{recipe.title}</Heading>
                    <Box style={styles.meta}>
                        <Text as="span" style={styles.metaItem}>
                            <Clock size={18} />
                            {recipe.preparation_time} min
                        </Text>
                        <Text as="span" style={styles.metaItem}>
                            <Users size={18} />
                            {recipe.servings} porciones
                        </Text>
                        <Text as="span" style={styles.badge}>{recipe.difficulty}</Text>
                    </Box>
                </Box>
            </Box>

            <Box style={styles.content}>
                <Box style={styles.main}>
                    {/* INGREDIENTS */}
                    <Section style={styles.section}>
                        <Box style={styles.sectionHeader}>
                            <Heading level={2} style={styles.sectionTitle}>Ingredientes</Heading>
                                {/* DYNAMIC BUTTON */}
                                <Button 
                                    onClick={toggleFavorite} 
                                    variant={isFavorited ? "secondary" : "primary"}
                                    disabled={favLoading}
                                >
                                    {isFavorited ? <Trash2 size={20} /> : <BookMarked size={20} />}
                                    {isFavorited ? "Quitar de favoritos" : "Guardar"}
                                </Button>
                        </Box>
                        <List style={styles.ingredientsList}>
                            {recipe.ingredients?.map((ing: any, i: number) => (
                                <ListItem key={i} style={styles.ingredient}>
                                    <Text as="span">{ing.ingredient_name}</Text>
                                    <Text as="span" style={styles.amount}>
                                        {ing.quantity} {ing.unit}
                                    </Text>
                                </ListItem>
                            ))}
                        </List>
                    </Section>

                    {/* INSTRUCTIONS */}
                    <Section style={styles.section}>
                        <Heading level={2} style={styles.sectionTitle}>Instrucciones</Heading>
                        <List ordered style={styles.instructionsList}>
                            {recipe.preparation_steps
                                ?.sort((a: any, b: any) => a.step_number - b.step_number)
                                .map((step: any, i: number) => (
                                    <ListItem key={i} style={styles.instruction}>
                                        {step.description}
                                    </ListItem>
                            ))}
                        </List>
                    </Section>

                    {/* COMMENTS */}
                    <Section style={styles.section}>
                        <Heading level={2} style={styles.sectionTitle}>Comentarios</Heading>
                        <Box style={styles.comments}>
                            {recipe.comments?.map((comment: any) => (
                                <Box key={comment.id} style={styles.comment}>
                                    <Box style={styles.commentHeader}>
                                        <Text as="strong">{comment.users?.username}</Text>
                                        <Box style={styles.rating}>
                                            {[...Array(comment.rating)].map((_, i) => (
                                                <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                                            ))}
                                        </Box>
                                    </Box>
                                    <Text style={styles.commentText}>{comment.comment}</Text>
                                    <Text as="span" style={styles.commentDate}>
                                        {new Date(comment.created_at).toLocaleDateString()}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                    </Section>
                </Box>
            </Box>
        </Box>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
    },
    hero: {
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        backgroundColor: colors.backgroundLight,
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        padding: spacing.xl,
        color: '#fff',
    },
    title: {
        fontSize: fontSize.xxxl,
        margin: `0 0 ${spacing.md}`,
        fontWeight: fontWeight.bold,
    },
    meta: {
        display: 'flex',
        gap: spacing.lg,
        flexWrap: 'wrap',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
    },
    badge: {
        padding: `${spacing.xs} 0.75rem`,
        background: colors.primary,
        borderRadius: borderRadius.sm,
        fontWeight: fontWeight.semibold,
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${spacing.xl} ${spacing.md}`,
    },
    main: {
        maxWidth: '800px',
    },
    section: {
        marginBottom: spacing.xxl,
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.semibold,
        margin: 0,
        color: colors.primaryDark,
    },
    ingredientsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    ingredient: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px solid #eee',
    },
    amount: {
        fontWeight: fontWeight.semibold,
        color: colors.primary,
    },
    instructionsList: {
        paddingLeft: spacing.lg,
    },
    instruction: {
        marginBottom: spacing.md,
        lineHeight: 1.6,
    },
    comments: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.lg,
    },
    comment: {
        padding: spacing.md,
        background: colors.backgroundLight,
        borderRadius: borderRadius.md,
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    rating: {
        display: 'flex',
        gap: spacing.xs,
    },
    commentText: {
        margin: `${spacing.sm} 0`,
    },
    commentImage: {
        width: '100%',
        maxWidth: '300px',
        borderRadius: borderRadius.sm,
        marginTop: spacing.sm,
    },
    commentDate: {
        fontSize: fontSize.sm,
        color: colors.textLight,
    },
};
