import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import Grid from '../components/layout/Grid';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Box from '../components/ui/Box';
import Text from '../components/ui/Text';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import { supabase } from '../supabaseClient';
import { useAuth } from '../Context/AuthContext';
import { useToast } from '../Context/ToastContext';

export default function UploadRecipe() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState('Fácil');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [categoryId, setCategoryId] = useState<number | string>('');
    const [categories, setCategories] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch categories so the user can pick one
    useEffect(() => {
        async function getCategories() {
            const { data } = await supabase.from('categories').select('id, name');
            if (data) setCategories(data);
        }
        getCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent upload if not logged in
        if (!user) {
            showToast('Debes iniciar sesión para publicar una receta', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Insert the main Recipe
            // Note: We're hardcoding user_id: 1 until we set up Auth!
            const { data: recipeData, error: recipeError } = await supabase
                .from('recipes')
                .insert([{
                    title,
                    preparation_time: parseInt(time),
                    servings: parseInt(servings),
                    difficulty,
                    category_id: categoryId,
                    user_id: user.id,
                    image_url: imageUrl || ''
                }])
                .select()
                .single();

            if (recipeError) throw recipeError;

            const recipeId = recipeData.id;

            // 2. Prepare & Insert Ingredients
            // We split the textarea by lines
            const ingredientRows = ingredients.split('\n').filter(line => line.trim()).map(line => ({
                recipe_id: recipeId,
                ingredient_name: line.trim()
            }));

            const { error: ingError } = await supabase.from('ingredients').insert(ingredientRows);
            if (ingError) throw ingError;

            // 3. Prepare & Insert Instructions
            const stepRows = instructions.split('\n').filter(line => line.trim()).map((line, index) => ({
                recipe_id: recipeId,
                step_number: index + 1,
                description: line.trim()
            }));

            const { error: stepError } = await supabase.from('preparation_steps').insert(stepRows);
            if (stepError) throw stepError;

            showToast('¡Receta publicada con éxito!', 'success');

            setTitle('');
            setTime('');
            setServings('');
            setIngredients('');
            setInstructions('');
            setCategoryId('');
        } catch (error: any) {
            showToast('Error: ' + error.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="800px">
            <PageTitle>Subir Receta</PageTitle>
            <Box as="form" onSubmit={handleSubmit} style={styles.form}>

                {/* Category Dropdown (New) */}
                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Categoría</Text>
                    <select
                        required
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </Box>

                <Input
                    label="Título de la receta"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <Grid columns="form" gap={spacing.md}>
                    <Input
                        label="Tiempo (minutos)"
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <Input
                        label="Porciones"
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        required
                    />
                </Grid>

                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Ingredientes (uno por línea)</Text>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Ej: 500g Harina"
                        style={{ ...styles.input, minHeight: '100px' }}
                        required
                    />
                </Box>

                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Instrucciones (un paso por línea)</Text>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Ej: Mezclar los ingredientes secos"
                        style={{ ...styles.input, minHeight: '150px' }}
                        required
                    />
                </Box>

                {/*
                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Imagen</Text>
                    <Box style={styles.upload}>
                        <Upload size={32} />
                        <Text as="span">Arrastra una imagen o haz clic para subir</Text>
                        <input type="file" accept="image/*" style={styles.fileInput} />
                    </Box>
                </Box>
                */}

                <Input
                    label="URL de la Imagen"
                    type="url"
                    placeholder=""
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Dificultad</Text>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        style={styles.input}
                    >
                        <option value="Fácil">Fácil</option>
                        <option value="Medio">Medio</option>
                        <option value="Difícil">Difícil</option>
                        <option value="Experto">Experto</option>
                    </select>
                </Box>

                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Publicando...' : 'Publicar Receta'}
                </Button>
            </Box>
        </Container>
    );
}

const styles: Record<string, React.CSSProperties> = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.lg,
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
    },
    label: {
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.base,
        color: colors.primaryDark,
    },
    input: {
        padding: '0.75rem',
        border: `2px solid ${colors.border}`,
        borderRadius: borderRadius.md,
        fontSize: fontSize.base,
        fontFamily: 'inherit',
        transition: 'border-color 0.3s',
    },
    upload: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        padding: spacing.xl,
        border: `2px dashed ${colors.primary}`,
        borderRadius: borderRadius.lg,
        cursor: 'pointer',
        position: 'relative',
        background: colors.backgroundLight,
        color: colors.primary,
    },
    fileInput: {
        position: 'absolute',
        inset: 0,
        opacity: 0,
        cursor: 'pointer',
    },
};
