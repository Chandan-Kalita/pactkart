import { Metadata } from "next";
import ShoppingCartPage from "../components/cart/ShoppingCart";

export default function CartPage(){
    return (
      <ShoppingCartPage/>
    )
} 

export const metadata: Metadata = {
  title: "My Cart | Pactkart",
};