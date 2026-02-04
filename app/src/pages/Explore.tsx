import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { Filter } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';

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

export default function Explore() {
    const [searchParams] = useSearchParams();
    const [difficulty, setDifficulty] = useState('');
    const query = searchParams.get('q') || '';

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    {query ? `Resultados para "${query}"` : 'Explorar Recetas'}
                </h1>
                <div style={styles.filters}>
                    <Filter size={20} />
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Todas</option>
                        <option value="Fácil">Fácil</option>
                        <option value="Media">Media</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </div>
            </div>

            <div style={styles.grid}>
                {mockRecipes
                    .filter((r) => !difficulty || r.difficulty === difficulty)
                    .map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    title: {
        fontSize: '2rem',
        margin: 0,
        fontWeight: 600,
        color: '#2d3142',
    },
    filters: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#8d6e63',
    },
    select: {
        padding: '0.5rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
};
