import { BACKEND_URL } from "@/lib/config/endpoints";
import { IProduct } from "@/lib/config/model";
import { createAppSlice } from "@/lib/createAppSlice";

interface SearchProductState {
    products: IProduct[]
    suggessions: string[]
    isLoading: boolean;
    error: string | null;

}

const initialState: SearchProductState = {
    products: [],
    suggessions: [],
    isLoading: false,
    error: null
}

export const searchProductSlice = createAppSlice({
    name: "searchProduct",
    initialState,
    reducers: (create) => ({
        searchProduct: create.asyncThunk(
            async (search: string) => {
                const url = `${BACKEND_URL}/products?title=${search}&limit=12`;
                const res = await fetch(url);
                const products = await res.json() as IProduct[];
                const suggessions = products.map((product) => product.title);
                return { products, suggessions };
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, { payload }) => {
                    state.products = payload.products;
                    state.suggessions = payload.suggessions;
                    state.isLoading = false;
                },
                rejected: (state, action) => {
                    state.error = action.error.message ?? "An error occurred";
                    state.isLoading = false;
                }
            }
        ),
        loadInitialProducts: create.asyncThunk(
            async () => {
                const url = `${BACKEND_URL}/products?offset=0&limit=12`;
                const res = await fetch(url);
                const products = await res.json() as IProduct[];
                return products;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, action) => {
                    state.products = action.payload;
                    state.isLoading = false;
                },
                rejected: (state, action) => {
                    state.error = action.error.message ?? "An error occurred";
                    state.isLoading = false
                }
            }
        ),
    }),
    selectors: {
        selectProducts: (state: SearchProductState) => state.products,
        selectSuggestions: (state: SearchProductState) => state.suggessions,
        selectLoading: (state: SearchProductState) => state.isLoading
    }
})

export const { searchProduct, loadInitialProducts } = searchProductSlice.actions;
export const { selectProducts, selectSuggestions, selectLoading } = searchProductSlice.selectors;