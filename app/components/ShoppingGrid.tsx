import Sidebar from "./product-list/Sidebar";
import ProductCard from "./ProductCard/ProductCard";
import { BACKEND_URL } from "@/lib/config/endpoints";
import { HomePageSearchParams, IProduct } from "@/lib/config/model";
import { Paginations } from "./product-list/Pagination";

const fetchProducts = async ({page, category, priceMax, priceMin, searchText}:{page:string, category?:string, priceMax?:string, priceMin?:string, searchText?:string}) => {
  const queries = new URLSearchParams()
  queries.append('offset', (( isNaN(Number(page)) ? 0 : Number(page) - 1) * 12).toString())
  if(searchText){
    queries.append('title',searchText)
  }
  if(category){
    queries.append('categoryId',category)
  }
  if(priceMin){
    queries.append('price_min',priceMin)
  }
  if(priceMax){
    queries.append('price_max', priceMax)
  }

  const url = `${BACKEND_URL}/products?limit=12&${queries.toString()}`
  console.log(url);
  
  const res = await fetch(url);
  const products = await res.json() as IProduct[];
  return products;
}

const ProductListingPage =async ({searchParams}:HomePageSearchParams) => {
  const {page, category, priceMax, priceMin, searchText} = await searchParams

  const products = await fetchProducts({page: page, category, priceMax, priceMin, searchText});



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
            <Paginations/>
            <span className="px-3 py-1">...</span>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductListingPage;