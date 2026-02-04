import { Clock, Users, BookMarked, Star } from 'lucide-react';
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

const mockRecipe = {
    id: '1',
    title: 'Mostachones',
    image: mostachon,
    time: 30,
    difficulty: 'Fácil',
    category: 'Postres',
    servings: 12,
    ingredients: [
        { name: 'Harina', amount: 500, unit: 'g' },
        { name: 'Azúcar', amount: 200, unit: 'g' },
        { name: 'Manteca vegetal', amount: 250, unit: 'g' },
        { name: 'Huevos', amount: 2, unit: 'pzas' },
        { name: 'Polvo para hornear', amount: 10, unit: 'g' },
    ],
    instructions: [
        'Precalienta el horno a 180°C',
        'Mezcla la manteca con el azúcar hasta obtener una crema',
        'Agrega los huevos uno por uno',
        'Incorpora la harina cernida con el polvo para hornear',
        'Forma bolitas y aplana ligeramente',
        'Hornea por 15-20 minutos hasta dorar',
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
        <Box style={styles.page}>
            <Box style={styles.hero}>
                <Image src={mockRecipe.image} alt={mockRecipe.title} style={styles.heroImage} />
                <Box style={styles.heroOverlay}>
                    <Heading level={1} style={styles.title}>{mockRecipe.title}</Heading>
                    <Box style={styles.meta}>
                        <Text as="span" style={styles.metaItem}>
                            <Clock size={18} />
                            {mockRecipe.time} min
                        </Text>
                        <Text as="span" style={styles.metaItem}>
                            <Users size={18} />
                            {mockRecipe.servings} porciones
                        </Text>
                        <Text as="span" style={styles.badge}>{mockRecipe.difficulty}</Text>
                    </Box>
                </Box>
            </Box>

            <Box style={styles.content}>
                <Box style={styles.main}>
                    <Section style={styles.section}>
                        <Box style={styles.sectionHeader}>
                            <Heading level={2} style={styles.sectionTitle}>Ingredientes</Heading>
                            <Button onClick={() => { }}>
                                <BookMarked size={20} />
                                Guardar
                            </Button>
                        </Box>
                        <List style={styles.ingredientsList}>
                            {mockRecipe.ingredients.map((ing, i) => (
                                <ListItem key={i} style={styles.ingredient}>
                                    <Text as="span">{ing.name}</Text>
                                    <Text as="span" style={styles.amount}>
                                        {ing.amount} {ing.unit}
                                    </Text>
                                </ListItem>
                            ))}
                        </List>
                    </Section>

                    <Section style={styles.section}>
                        <Heading level={2} style={styles.sectionTitle}>Instrucciones</Heading>
                        <List ordered style={styles.instructionsList}>
                            {mockRecipe.instructions.map((step, i) => (
                                <ListItem key={i} style={styles.instruction}>
                                    {step}
                                </ListItem>
                            ))}
                        </List>
                    </Section>

                    <Section style={styles.section}>
                        <Heading level={2} style={styles.sectionTitle}>Comentarios y Fotos</Heading>
                        <Box style={styles.comments}>
                            {mockComments.map((comment) => (
                                <Box key={comment.id} style={styles.comment}>
                                    <Box style={styles.commentHeader}>
                                        <Text as="strong">{comment.user}</Text>
                                        <Box style={styles.rating}>
                                            {[...Array(comment.rating)].map((_, i) => (
                                                <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                                            ))}
                                        </Box>
                                    </Box>
                                    <Text style={styles.commentText}>{comment.text}</Text>
                                    {comment.image && (
                                        <Image src={comment.image} alt="Foto del usuario" style={styles.commentImage} />
                                    )}
                                    <Text as="span" style={styles.commentDate}>{comment.date}</Text>
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
