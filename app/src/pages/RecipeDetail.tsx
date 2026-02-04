import { Clock, Users, BookMarked, Star } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';

const mockRecipe = {
    id: '1',
    title: 'Pastel de Chocolate',
    image: logo,
    time: 45,
    difficulty: 'Media',
    category: 'Postres',
    servings: 8,
    ingredients: [
        { name: 'Harina', amount: 250, unit: 'g' },
        { name: 'Azúcar', amount: 200, unit: 'g' },
        { name: 'Huevos', amount: 3, unit: 'pzas' },
        { name: 'Mantequilla', amount: 150, unit: 'g' },
        { name: 'Cacao en polvo', amount: 50, unit: 'g' },
    ],
    instructions: [
        'Precalienta el horno a 180°C',
        'Mezcla la harina con el cacao en polvo',
        'Bate la mantequilla con el azúcar hasta obtener una crema',
        'Agrega los huevos uno por uno',
        'Incorpora la mezcla de harina y cacao',
        'Vierte en un molde engrasado',
        'Hornea por 35-40 minutos',
    ],
};

const mockComments = [
    {
        id: '1',
        user: 'María González',
        text: 'Quedó delicioso, toda mi familia lo amó',
        rating: 5,
        date: '2026-01-15',
        image: logo,
    },
    {
        id: '2',
        user: 'Carlos Pérez',
        text: 'Muy fácil de seguir, las medidas son exactas',
        rating: 5,
        date: '2026-01-20',
    },
];

export default function RecipeDetail() {
    return (
        <div style={styles.page}>
            <div style={styles.hero}>
                <img src={mockRecipe.image} alt={mockRecipe.title} style={styles.heroImage} />
                <div style={styles.heroOverlay}>
                    <h1 style={styles.title}>{mockRecipe.title}</h1>
                    <div style={styles.meta}>
                        <span style={styles.metaItem}>
                            <Clock size={18} />
                            {mockRecipe.time} min
                        </span>
                        <span style={styles.metaItem}>
                            <Users size={18} />
                            {mockRecipe.servings} porciones
                        </span>
                        <span style={styles.badge}>{mockRecipe.difficulty}</span>
                    </div>
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.main}>
                    <section style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Ingredientes</h2>
                            <button style={styles.saveBtn}>
                                <BookMarked size={20} />
                                Guardar
                            </button>
                        </div>
                        <ul style={styles.ingredientsList}>
                            {mockRecipe.ingredients.map((ing, i) => (
                                <li key={i} style={styles.ingredient}>
                                    <span>{ing.name}</span>
                                    <span style={styles.amount}>
                                        {ing.amount} {ing.unit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Instrucciones</h2>
                        <ol style={styles.instructionsList}>
                            {mockRecipe.instructions.map((step, i) => (
                                <li key={i} style={styles.instruction}>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Comentarios y Fotos</h2>
                        <div style={styles.comments}>
                            {mockComments.map((comment) => (
                                <div key={comment.id} style={styles.comment}>
                                    <div style={styles.commentHeader}>
                                        <strong>{comment.user}</strong>
                                        <div style={styles.rating}>
                                            {[...Array(comment.rating)].map((_, i) => (
                                                <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                                            ))}
                                        </div>
                                    </div>
                                    <p style={styles.commentText}>{comment.text}</p>
                                    {comment.image && (
                                        <img src={comment.image} alt="Foto del usuario" style={styles.commentImage} />
                                    )}
                                    <span style={styles.commentDate}>{comment.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
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
        objectFit: 'cover',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        padding: '2rem',
        color: '#fff',
    },
    title: {
        fontSize: '2.5rem',
        margin: '0 0 1rem',
        fontWeight: 700,
    },
    meta: {
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    badge: {
        padding: '0.25rem 0.75rem',
        background: '#8d6e63',
        borderRadius: '6px',
        fontWeight: 600,
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    main: {
        maxWidth: '800px',
    },
    section: {
        marginBottom: '3rem',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        fontWeight: 600,
        margin: 0,
        color: '#2d3142',
    },
    saveBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: '#8d6e63',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        transition: 'background 0.3s',
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
        fontWeight: 600,
        color: '#8d6e63',
    },
    instructionsList: {
        paddingLeft: '1.5rem',
    },
    instruction: {
        marginBottom: '1rem',
        lineHeight: 1.6,
    },
    comments: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    comment: {
        padding: '1rem',
        background: '#f8f8f8',
        borderRadius: '8px',
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    rating: {
        display: 'flex',
        gap: '0.25rem',
    },
    commentText: {
        margin: '0.5rem 0',
    },
    commentImage: {
        width: '100%',
        maxWidth: '300px',
        borderRadius: '4px',
        marginTop: '0.5rem',
    },
    commentDate: {
        fontSize: '0.875rem',
        color: '#666',
    },
};
