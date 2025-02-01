import { ICategory, ISearchFormData } from "@/lib/config/model";
import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

export interface IFilterSliceState {
  page: number
  searchText: string,
  category: number,
  priceMin: number,
  priceMax: number,
}

const initialState: IFilterSliceState = {
  page: 1,
  searchText: '',
  category: 0,
  priceMax: 0,
  priceMin: 0
};

export const filterSlice = createAppSlice({
  name: "filter",
  initialState,
  reducers: (create) => ({
    setPage: create.reducer((state, action: PayloadAction<number>) => {
      state.page = action.payload
    }),
    setFilters: create.reducer((state, action: PayloadAction<IFilterSliceState>) => {
      console.log('setfilter');
      
      console.log(action.payload);
      state.category = action.payload.category
      state.priceMax = action.payload.priceMax
      state.priceMin = action.payload.priceMin
      state.searchText = action.payload.searchText
      state.page = action.payload.page

    })
  }),
  selectors: {
    selectPage: (state) => state.page,
    selectSearchText: (state)=> state.searchText,
    selectCategory: (state)=> state.category,
    selectPriceMax: (state)=> state.priceMax,
    selectPriceMin: (state)=> state.priceMin
  },
});

export const { setPage, setFilters } =
  filterSlice.actions;

export const {selectPage, selectCategory, selectPriceMax, selectPriceMin, selectSearchText} = filterSlice.selectors