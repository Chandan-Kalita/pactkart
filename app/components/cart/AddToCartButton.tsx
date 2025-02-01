'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks"

export const AddToCartButton = ({ productId }: { productId: number }) => {
    const dispatch = useAppDispatch();

    const onAddToCart = () => {
        dispatch(addToCart(productId));
    }
    return <>
        <button onClick={onAddToCart} className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add to cart
        </button>
    </>
}