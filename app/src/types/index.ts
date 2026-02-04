export interface Recipe {
    id: string;
    title: string;
    image: string;
    time: number;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    category: string;
    ingredients: Ingredient[];
    instructions: string[];
    servings: number;
}

export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Comment {
    id: string;
    user: string;
    text: string;
    rating: number;
    date: string;
    image?: string;
}
