import { IProduct } from "@/lib/config/model"
import ProductCard from "../product-card/ProductCard"

const ProductGrid = ({ isLoading, products }: { isLoading: boolean, products: IProduct[] }) => {
    return <>
        {isLoading ? (
            <div className="text-center">Loading...</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        )}
    </>
}


export default ProductGrid