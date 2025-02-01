'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getCartItemDetails, removeFromCart, selectCartIdemDetails, selectCartItems, selectTotalAmount, updateQuantity } from '@/lib/features/cart/cartSlice';
import { CartItem } from './CartItem';


const ShoppingCartPage = () => {
  const cartItems = useAppSelector(selectCartItems)
  const cartItemDetails = useAppSelector(selectCartIdemDetails)
  const dispatch = useAppDispatch()
  const totalPrice = useAppSelector(selectTotalAmount)

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ itemId: id, quantity }))
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    dispatch(getCartItemDetails());
  }, [cartItems]);

  return (
    <>
      {/* Main Content */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {cartItems.map((item) => {
            const product = cartItemDetails.find((p) => p.id === item.productId);
            if (!product) return null;
            return <CartItem
              quantity={item.quantity}
              product={product}
              key={item.productId}
              onQuantityChange={(quantity) => handleQuantityChange(item.productId, quantity)}
              onRemove={() => handleRemove(item.productId)}
            />
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <span>Total Price:</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;