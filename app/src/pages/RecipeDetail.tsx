import { Clock, Users, BookMarked, Star } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import Button from '../components/ui/Button';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';

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
                            <Button onClick={() => { }}>
                                <BookMarked size={20} />
                                Guardar
                            </Button>
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
