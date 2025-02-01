import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import ProductListingPage from "./components/ShoppingGrid";
import { HomePageSearchParams } from "@/lib/config/model";

export default function HomePage({searchParams}:HomePageSearchParams) {
  return       <ProductListingPage searchParams={searchParams}/>  ;
}

export const metadata: Metadata = {
  title: "Pactkart",
};
