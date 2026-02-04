import { useState } from 'react';
import { Upload } from 'lucide-react';

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
        <div style={styles.page}>
            <h1 style={styles.title}>Subir Receta</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Título de la receta</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.row}>
                    <div style={styles.field}>
                        <label style={styles.label}>Tiempo (minutos)</label>
                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Porciones</label>
                        <input
                            type="number"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
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

                <button type="submit" style={styles.button}>
                    Publicar Receta
                </button>
            </form>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        fontWeight: 700,
        color: '#5d4037',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontWeight: 600,
        fontSize: '1rem',
        color: '#2d3142',
    },
    input: {
        padding: '0.75rem',
        border: '2px solid #d7ccc8',
        borderRadius: '8px',
        fontSize: '1rem',
        fontFamily: 'inherit',
        transition: 'border-color 0.3s',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
    },
    upload: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '2rem',
        border: '2px dashed #8d6e63',
        borderRadius: '12px',
        cursor: 'pointer',
        position: 'relative',
        background: '#f5f0e8',
        color: '#8d6e63',
    },
    fileInput: {
        position: 'absolute',
        inset: 0,
        opacity: 0,
        cursor: 'pointer',
    },
    button: {
        padding: '1rem',
        background: '#8d6e63',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.125rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};
