import { BACKEND_URL } from "@/lib/config/endpoints";
import { ICategory, IProduct } from "@/lib/config/model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/categories` }),
    reducerPath: "categoryApi",
    tagTypes: ["Category"],
    endpoints: (build) => ({
      getCategories: build.query<ICategory[], void>({
        query:()=>'',
      }),
      getCateogryProducts: build.query<IProduct[], number>({
        query:(id)=>`/${id}/products?offset=0&limit=3`,
        providesTags: (result, error, id) => [{ type: "Category", id }],
      }),
    }),
  });
  
  export const { useGetCategoriesQuery, useGetCateogryProductsQuery } = categoryApiSlice;
  