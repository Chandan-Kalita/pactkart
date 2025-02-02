import { IProduct } from "@/lib/config/model";
import { checkUrl } from "@/lib/utils/dataSource";
import Image from "next/image";
import Link from "next/link";



export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-500px">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <Image
                        src={checkUrl(product.images[0])}
                        width={100}
                        height={100}
                        alt={product.title}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-sm text-gray-500">{product.category.name}</p>
                </div>
            </div>
        </Link>
    )
}