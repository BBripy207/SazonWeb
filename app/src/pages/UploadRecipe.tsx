import { useState } from 'react';
import { Upload } from 'lucide-react';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import Grid from '../components/layout/Grid';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Box from '../components/ui/Box';
import Text from '../components/ui/Text';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';

export default function UploadRecipe() {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState('Fácil');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Receta enviada con éxito');
    };

    return (
        <Container maxWidth="800px">
            <PageTitle>Subir Receta</PageTitle>
            <Box as="form" onSubmit={handleSubmit} style={styles.form}>
                <Input
                    label="Título de la receta"
                    type="text"
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
                    <Box style={styles.field}>
                        <Text as="label" style={styles.label}>Dificultad</Text>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            style={styles.input}
                        >
                            <option>Fácil</option>
                            <option>Media</option>
                            <option>Difícil</option>
                        </select>
                    </Box>
                </Grid>

                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Ingredientes</Text>
                    <textarea
                        placeholder="Escribe cada ingrediente con su medida (ej: 250g harina)"
                        style={{ ...styles.input, minHeight: '100px' }}
                        required
                    />
                </Box>

                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Instrucciones</Text>
                    <textarea
                        placeholder="Escribe cada paso de la receta"
                        style={{ ...styles.input, minHeight: '150px' }}
                        required
                    />
                </Box>

                <Box style={styles.field}>
                    <Text as="label" style={styles.label}>Imagen</Text>
                    <Box style={styles.upload}>
                        <Upload size={32} />
                        <Text as="span">Arrastra una imagen o haz clic para subir</Text>
                        <input type="file" accept="image/*" style={styles.fileInput} />
                    </Box>
                </Box>

                <Button type="submit" variant="primary" size="lg">
                    Publicar Receta
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
