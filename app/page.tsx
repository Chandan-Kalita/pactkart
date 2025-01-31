import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import ProductListingPage from "./components/ShoppingGrid";

export default function HomePage() {
  return       <ProductListingPage />  ;
}

export const metadata: Metadata = {
  title: "Pactkart",
};
