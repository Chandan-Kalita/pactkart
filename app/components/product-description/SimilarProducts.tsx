'use client'

import { useGetCateogryProductsQuery } from "@/lib/features/category/categoryApiSlice";
import ProductCard from "../ProductCard/ProductCard";

export const SimilarProducts = ({ category, hiddenProductId }: { category: number, hiddenProductId:number }) => {

    const { data: similarProducts, isLoading, isError } = useGetCateogryProductsQuery(category);
    return <>
        <div>
            <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                isLoading ? (
                    <h1>Loading...</h1>
                ) : isError ? (
                    <h1>Error fetching similar products.</h1>
                ) : similarProducts &&
                similarProducts.filter((v)=>v.id!=hiddenProductId).map((product) => (
                    
                  <ProductCard key={product.id} product={product} />
                ))
                
                }
            </div>
        </div>
    </>
}
