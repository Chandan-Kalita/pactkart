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
    searchText: string
    category: number
    priceMin: number
    priceMax: number
}