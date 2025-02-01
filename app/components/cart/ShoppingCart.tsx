'use client'
import React, { useEffect, useState } from 'react';
import {  Minus, Plus, Trash2 } from 'lucide-react';
import { useGetProductByIdQuery } from '@/lib/features/product/productApiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeFromCart, selectCartItems, updateQuantity } from '@/lib/features/cart/cartSlice';
import ProductCard from '../ProductCard/ProductCard';

interface CartItemProps {
  productId: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  updateTotalPrice: (delta: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId,quantity, onQuantityChange, onRemove, updateTotalPrice }) => {

  const {isError, isLoading, data} = useGetProductByIdQuery(productId);
  
  useEffect(() => {
    if(data){
      updateTotalPrice(data.price * quantity);
    }
  }, [data, quantity]);
  
  const handleQuantityChange = (delta:number) => {
    const newQuantity = Math.max(1, quantity + delta);
    onQuantityChange(newQuantity);
  };
  
  return (
    <div className="flex flex-col p-4">
      {isLoading ? <p>Loading...</p> : isError ? <p>Error fetching product.</p> : null }
      {data && <ProductCard product={data} />}

      <div className="flex items-center gap-3 mt-auto">
        <button onClick={() => handleQuantityChange(-1)} className="p-1 hover:bg-gray-100 rounded">
          <Minus size={16} />
        </button>
        <span className="font-medium">{quantity}</span>
        <button onClick={() => handleQuantityChange(1)} className="p-1 hover:bg-gray-100 rounded">
          <Plus size={16} />
        </button>
        <button onClick={onRemove} className="p-1 hover:bg-gray-100 rounded ml-auto text-red-500">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const ShoppingCartPage = () => {
  const cartItems = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (id:number, quantity:number) => {
    dispatch(updateQuantity({itemId:id, quantity}))
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotalPrice = (delta:number) => {
    setTotalPrice(totalPrice + delta);
  }


  return (
<>
        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Product Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <CartItem
                quantity={item.quantity}
                key={item.productId}
                productId={item.productId}
                onQuantityChange={(quantity) => handleQuantityChange(item.productId, quantity)}
                onRemove={() => handleRemove(item.productId)}
                updateTotalPrice={calculateTotalPrice}
              />
            ))}
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