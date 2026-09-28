export interface CreateCarInput {
    brand_id: number;
    model: string;
    year: number;
    price: number;
    picture?: string;
    description?: string;
}

export interface UpdateCarInput {
    brand_id?: number;
    model?: string;
    year?: number;
    price?: number;
    picture?: string;
    description?: string;
}