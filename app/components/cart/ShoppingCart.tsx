'use client'
import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  title: string;
  price: number;
  category: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ title, price, category, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta:number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-sm bg-white">
      <div className="aspect-video bg-gray-100 rounded-md mb-3"></div>
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-gray-600">${price}</p>
      <p className="text-sm text-gray-500 mb-3">{category}</p>
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
  const [items] = useState([
    { id: 1, title: "Product 1", price: 29.99, category: "Category 1" },
    { id: 2, title: "Product 2", price: 39.99, category: "Category 2" },
    { id: 3, title: "Product 3", price: 49.99, category: "Category 3" },
  ]);

  const handleQuantityChange = (id:number, quantity:number) => {
    // Update total price logic here
  };

  const handleRemove = (id: number) => {
    // Remove item logic here
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
<>
        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Product Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                onRemove={() => handleRemove(item.id)}
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