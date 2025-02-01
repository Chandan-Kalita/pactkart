import type { Metadata } from "next";
import ProductListingPage from "./components/ShoppingGrid";

export default function HomePage({searchParams}:{searchParams:any}) {
  return       <ProductListingPage searchParams={searchParams}/>  ;
}

export const metadata: Metadata = {
  title: "Pactkart",
};
