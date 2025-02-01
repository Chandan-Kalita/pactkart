import { IFilterSliceState } from "../features/filter/filterSlice";

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


export interface HomePageSearchParams {
    searchParams: Promise<{ page: string, searchText:string,category:string,priceMin:string,priceMax:string }>
}


export type ISearchFormData = Omit<IFilterSliceState, "page">