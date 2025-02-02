import Link from "next/link";
import CartButton from "./product-list/CartBtn";

export default function Header({ path }: { path: string }) {
  return (
    <header className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
      <Link href={'/'}><h1 className="text-xl font-semibold">Pactkart</h1></Link>
      <Link href={'/search'}>Search Products</Link>
      <CartButton />
    </header>
  )
}