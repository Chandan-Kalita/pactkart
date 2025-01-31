import Link from "next/link";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                        src="/api/placeholder/400/300"
                        alt={product.title}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                </div>
            </div>
        </Link>
    )
}