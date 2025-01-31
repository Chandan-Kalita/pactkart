'use client'
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function CartButton(){
    const [itemCount, setItemCount] = useState(0);
    return (
        <Link href={`/cart`} passHref>
        <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>
          </Link>
    )
}