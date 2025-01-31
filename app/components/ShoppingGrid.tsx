import Link from "next/link";
import Header from "./Header";
import Sidebar from "./product-list/Sidebar";
import ProductCard from "./ProductCard/ProductCard";

const ProductListingPage = () => {

  // Sample product data
  const products = [
    { id: 1, title: 'Product 1', price: 99.99, category: 'cat 1' },
    { id: 2, title: 'Product 2', price: 149.99, category: 'cat 2' },
    { id: 3, title: 'Product 3', price: 199.99, category: 'cat 3' },
    { id: 4, title: 'Product 4', price: 79.99, category: 'cat 4' },
    { id: 5, title: 'Product 5', price: 129.99, category: 'cat 1' },
  ];


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