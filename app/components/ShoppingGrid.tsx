import Link from "next/link";
import Header from "./Header";
import Sidebar from "./product-list/Sidebar";
import ProductCard from "./ProductCard/ProductCard";
import { BACKEND_URL } from "@/lib/config/endpoints";
import { Product } from "@/lib/config/model";

const fetchProducts = async () => {
  const res = await fetch(`${BACKEND_URL}/products?offset=0&limit=10`);
  const products = await res.json() as Product[];
  return products;
}

const ProductListingPage =async () => {

  const products = await fetchProducts();



  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar />

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className="px-3 py-1 border rounded-lg hover:bg-gray-100"
              >
                {page}
              </button>
            ))}
            <span className="px-3 py-1">...</span>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductListingPage;