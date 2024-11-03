export interface Category {
    id?: number;
    name?: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date
}

export interface User {
    id?: number;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    category?: Category[]
}

export interface Meal {
    title: string;
    category?: Category[];
    ingredients: string;
    servings: string;
    instructions: string;
}