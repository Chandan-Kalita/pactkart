'use client'
import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useGetProductByIdQuery } from '@/lib/features/product/productApiSlice';
import ProductCard from '../ProductCard/ProductCard';
import { IProduct } from '@/lib/config/model';


interface CartItemProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
    product: IProduct;
}

export const CartItem: React.FC<CartItemProps> = ({ quantity, product, onQuantityChange, onRemove }) => {


    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, quantity + delta);
        onQuantityChange(newQuantity);
    };

    return (
        <div className="flex flex-col p-4">
            <ProductCard product={product} />

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
