export interface ICategory {
    id: number;
    name: string;
    image: string;
}

export interface IProduct {
    id: number;
    title: string
    price: number
    description: string
    category: ICategory
    images: string[]
}

export interface FilterState {
    page: number
    category: number
    priceMin: number
    priceMax: number
}

export interface ICartItem {
    productId: number
    quantity: number
}