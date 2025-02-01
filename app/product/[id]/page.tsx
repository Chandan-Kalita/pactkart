import React from 'react';
import { Metadata } from 'next';
import { checkUrl, fetchProductById } from '@/lib/utils/dataSource';
import Image from 'next/image';
import { SimilarProducts } from '@/app/components/product-description/SimilarProducts';
import { AddToCartButton } from '@/app/components/cart/AddToCartButton';
import { notFound } from 'next/navigation';


const ProductPage = async ({ params }: { params: any }) => {
  const product = await fetchProductById((await params).id);
  if (product === null) {
    return notFound()
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg overflow-hidden">
              <Image
                width={100}
                height={100}
                src={checkUrl(product.images[0])}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.slice(1).map((img, idx) => (
                <div key={idx} className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                  <Image width={100} height={100} src={checkUrl(img)} alt={`${product.title} ${idx + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
            <p className="text-gray-600">{product.category.name}</p>
            <p className="text-gray-700">{product.description}</p>
            <AddToCartButton productId={product.id} />
          </div>
        </div>

        <SimilarProducts category={product.category.id} hiddenProductId={product.id} />
      </main>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const product = await fetchProductById((await params).id);
  if (product === null) {
    return {
      title: 'Product not found | Pactkart',
    };
  }
  return {
    title: `${product.title} | Pactkart`,
  };
}