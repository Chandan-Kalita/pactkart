import CartButton from "./product-list/CartBtn";

export default function Header () {
    return (
        <header className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Pactkart</h1>
        <CartButton/>
      </header>
    )
}