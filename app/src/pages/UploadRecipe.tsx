import { useState } from 'react';
import { Upload } from 'lucide-react';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
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
            <form onSubmit={handleSubmit} style={styles.form}>
                <Input
                    label="Título de la receta"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <div style={styles.row}>
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
                    <div style={styles.field}>
                        <label style={styles.label}>Dificultad</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            style={styles.input}
                        >
                            <option>Fácil</option>
                            <option>Media</option>
                            <option>Difícil</option>
                        </select>
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Ingredientes</label>
                    <textarea
                        placeholder="Escribe cada ingrediente con su medida (ej: 250g harina)"
                        style={{ ...styles.input, minHeight: '100px' }}
                        required
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Instrucciones</label>
                    <textarea
                        placeholder="Escribe cada paso de la receta"
                        style={{ ...styles.input, minHeight: '150px' }}
                        required
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Imagen</label>
                    <div style={styles.upload}>
                        <Upload size={32} />
                        <span>Arrastra una imagen o haz clic para subir</span>
                        <input type="file" accept="image/*" style={styles.fileInput} />
                    </div>
                </div>

                <Button type="submit" variant="primary" size="lg">
                    Publicar Receta
                </Button>
            </form>
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
    row: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: spacing.md,
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
