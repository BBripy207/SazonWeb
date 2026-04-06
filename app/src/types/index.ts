export interface Recipe {
    id: string | number;
    title: string;
    image_url: string;        
    preparation_time: number; 
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    category_id?: number;
    categories?: { name: string } | { name: string }[]; 
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
