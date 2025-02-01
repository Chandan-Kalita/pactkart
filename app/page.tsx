import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import ProductListingPage from "./components/ShoppingGrid";

export default function HomePage({searchParams}:{searchParams:any}) {
  return       <ProductListingPage searchParams={searchParams}/>  ;
}

export const metadata: Metadata = {
  title: "Pactkart",
};
