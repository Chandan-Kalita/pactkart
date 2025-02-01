'use client'
import { loadCart, selectCartCount } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function CartButton(){
  const cartCount = useAppSelector(selectCartCount)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(loadCart())
  })

  return (
        <Link href={`/cart`} passHref>
        <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          </Link>
    )
}