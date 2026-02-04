import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { ChefHat, Clock, Heart } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';

const categories = [
    { name: 'Postres', icon: Heart },
    { name: 'Comida Casera', icon: ChefHat },
    { name: 'Rápidas', icon: Clock },
];

const mockRecipes = [
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
        id: '2',
        title: 'Sopa de Verduras',
        image: logo,
        time: 30,
        difficulty: 'Fácil' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
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

export default function Home() {
    return (
        <div style={styles.page}>
            <section style={styles.hero}>
                <h1 style={styles.title}>Encuentra tu receta perfecta</h1>
                <p style={styles.subtitle}>Medidas estandarizadas para resultados consistentes</p>
                <SearchBar />
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Categorías</h2>
                <div style={styles.categories}>
                    {categories.map((cat) => (
                        <div key={cat.name} style={styles.category}>
                            <cat.icon size={32} />
                            <span>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Vistos Recientemente</h2>
                <div style={styles.grid}>
                    {mockRecipes.map((recipe) => (
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
    hero: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    title: {
        fontSize: '2.5rem',
        margin: '0 0 1rem',
        fontWeight: 700,
        color: '#5d4037',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#666',
        marginBottom: '2rem',
    },
    section: {
        marginBottom: '3rem',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        marginBottom: '1.5rem',
        fontWeight: 600,
        color: '#2d3142',
    },
    categories: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
    },
    category: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        color: '#8d6e63',
        fontWeight: 600,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
};
