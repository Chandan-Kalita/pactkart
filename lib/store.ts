import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { categoryApiSlice } from "./features/category/categoryApiSlice";
import { cartSlice } from "./features/cart/cartSlice";
import { productApiSlice } from "./features/product/productApiSlice";
import { searchProductSlice } from "./features/product/productSearchSlice";

const rootReducer = combineSlices(categoryApiSlice, cartSlice, productApiSlice, searchProductSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(categoryApiSlice.middleware, productApiSlice.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
