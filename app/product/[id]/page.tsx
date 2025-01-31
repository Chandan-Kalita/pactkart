import React from 'react';
import { ShoppingCart } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { Metadata } from 'next';

const ProductPage = () => {
  // Sample data - in real app would be props or API data
  const product = {
    title: "Sample Product",
    price: "$99.99",
    category: "Electronics",
    description: "This is a detailed product description. It explains all the features and benefits of the product to help customers make an informed decision.",
    images: ["/api/placeholder/600/400", "/api/placeholder/100/100", "/api/placeholder/100/100", "/api/placeholder/100/100"],
  };

  const similarProducts = [
    { id: 1, title: "Similar Product 1", price: 89.99, category: "Electronics", image: "/api/placeholder/200/200" },
    { id: 2, title: "Similar Product 2", price: 79.99, category: "Electronics", image: "/api/placeholder/200/200" },
    { id: 3, title: "Similar Product 3", price: 69.99, category: "Electronics", image: "/api/placeholder/200/200" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.slice(1).map((img, idx) => (
                <div key={idx} className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                  <img src={img} alt={`${product.title} ${idx + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-2xl font-semibold text-blue-600">{product.price}</p>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-gray-700">{product.description}</p>
            <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add to cart
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;

export const metadata: Metadata = {
  title: "Product | Pactkart",
};