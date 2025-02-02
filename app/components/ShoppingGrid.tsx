import Sidebar from "./product-list/Sidebar";
import ProductCard from "./product-card/ProductCard";
import { FilterState } from "@/lib/config/model";
import { Pagination } from "./product-list/Pagination";
import { fetchProducts } from "@/lib/utils/dataSource";
import ProductGrid from "./search-page/ProductGrid";



const ProductListingPage = async ({ searchParams }: { searchParams: FilterState }) => {
  const { page, category, priceMax, priceMin } = await searchParams

  const products = await fetchProducts({ page: page?.toString() || '1', category: category?.toString() || undefined, priceMax: priceMax?.toString() || undefined, priceMin: priceMin?.toString() || undefined });



  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar />

        <main className="flex-1">
          <ProductGrid products={products} isLoading={false} />

          <div className="mt-6 flex justify-center space-x-2">
            <Pagination totalPages={5} />
            <span className="px-3 py-1">...</span>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductListingPage;