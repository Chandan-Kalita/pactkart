'use client'

import { addToCart, selectCartItems } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Link from "next/link";
import { useEffect, useState } from "react";

export const AddToCartButton = ({ productId }: { productId: number }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const [addedToCart, setAddedToCart] = useState(false);
    useEffect(() => {
        if (cartItems.find(item => item.productId === productId)) {
            setAddedToCart(true);
        }
    }, [cartItems]);
    const onAddToCart = () => {
        dispatch(addToCart(productId));
    }
    return <>

        {
            addedToCart ? <Link className="text-blue-600" href="/cart">
                <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Go to cart
                </button>

            </Link> : (<button onClick={onAddToCart} className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add to cart
            </button>)
        }

    </>
}