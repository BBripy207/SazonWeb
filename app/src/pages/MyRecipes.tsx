import RecipeCard from '../components/RecipeCard';
import { History, Heart } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';

const mockSaved = [
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

const mockRecent = [
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
];

export default function MyRecipes() {
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Mi Recetario</h1>

            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <Heart size={24} />
                    <h2 style={styles.sectionTitle}>Recetas Guardadas</h2>
                </div>
                <div style={styles.grid}>
                    {mockSaved.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <History size={24} />
                    <h2 style={styles.sectionTitle}>Vistas Recientemente</h2>
                </div>
                <div style={styles.grid}>
                    {mockRecent.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        fontWeight: 700,
        color: '#5d4037',
    },
    section: {
        marginBottom: '3rem',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        color: '#8d6e63',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 600,
        margin: 0,
        color: '#2d3142',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
};
