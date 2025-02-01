import { BACKEND_URL } from "../config/endpoints";
import { IProduct } from "../config/model";


/**
 * 
 * @param id Product ID
 * @returns IProduct | null
 */
export const fetchProductById = async (id: string) => {
  const url = `${BACKEND_URL}/products/${id}`;
  const res = await fetch(url);
  if (res.ok === false) {
    return null
  }
  const product = await res.json() as IProduct;
  return product;
}


/**
 * 
 * @param page Current page number
 * @param category Category ID
 * @param priceMax Maximum price
 * @param priceMin Minimum price
 * @param searchText Search text
 * @returns IProducts[]
 */
export const fetchProducts = async ({ page, category, priceMax, priceMin, searchText }: { page: string, category?: string, priceMax?: string, priceMin?: string, searchText?: string }) => {
  const queries = new URLSearchParams()
  queries.append('offset', ((isNaN(Number(page)) ? 0 : Number(page) - 1) * 12).toString())
  if (searchText) {
    queries.append('title', searchText)
  }
  if (category) {
    queries.append('categoryId', category)
  }
  if (priceMin) {
    queries.append('price_min', priceMin)
  }
  if (priceMax) {
    queries.append('price_max', priceMax)
  }

  const url = `${BACKEND_URL}/products?limit=12&${queries.toString()}`
  console.log(url);

  const res = await fetch(url);
  const products = await res.json() as IProduct[];
  return products;
}


/**
 * 
 * @param url 
 * @returns Original URL if valid, placeholder image URL if invalid
 */
export function checkUrl(url: string) {
  try {
    const _ = new URL(url)
    return url
  } catch (_) {
    return "https://placehold.co/400x400.png"
  }
}