import { BACKEND_URL } from "@/lib/config/endpoints";
import { IProduct } from "@/lib/config/model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/products` }),
    reducerPath: "productApi",
    tagTypes: ["Product"],
    endpoints: (build) => ({
      getProductById: build.query<IProduct, number>({
        query:(id)=>`/${id}`,
      }),
    }),
  });
  
  export const { useGetProductByIdQuery } = productApiSlice;
  