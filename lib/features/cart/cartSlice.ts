import { ICartItem } from "@/lib/config/model";
import { createAppSlice } from "@/lib/createAppSlice";

const CART_STORAGE_KEY = 'shopping-cart';

const getStoredCart = (): ICartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const updateStoredCart = (cart: ICartItem[]) => {  
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

interface CartState {
    cartItems: ICartItem[];
    }

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    loadCart: create.asyncThunk(
      async (_, { dispatch }) => {
        const cart = getStoredCart();
        return cart;
      },
      {
        fulfilled: (state, action) => {
          state.cartItems = action.payload;
        },
      }
    ),
    addToCart: create.asyncThunk(
      async (item: number, { getState }) => {
        console.log("Added to cart", item);
        
        const state = (getState() as { cart: CartState }).cart;
        
        const existingItem = state.cartItems.find(
          (cartItem) => cartItem.productId === item
        );

        let updatedCart: ICartItem[];
        
        if (existingItem) {
          updatedCart = state.cartItems.map((cartItem) =>
            cartItem.productId === item
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          updatedCart = [...state.cartItems, { productId:item, quantity: 1 }];
        }

        updateStoredCart(updatedCart);
        return updatedCart;
      },
      {
        fulfilled: (state, action) => {
          state.cartItems = action.payload;
        },
      }
    ),

    removeFromCart: create.asyncThunk(
      async (itemId: number, { getState }) => {
        const state = (getState() as {cart:CartState}).cart;
        const updatedCart = state.cartItems.filter(item => item.productId !== itemId);
        updateStoredCart(updatedCart);
        return updatedCart;
      },
      {
        fulfilled: (state, action) => {
          state.cartItems = action.payload;
        },
      }
    ),

    updateQuantity: create.asyncThunk(
      async ({ itemId, quantity }: { itemId: number; quantity: number }, { getState }) => {
        console.log("Updated quantity", itemId, quantity);
        
        const state = (getState() as {cart:CartState}).cart;
        const updatedCart = state.cartItems.map(item =>
          item.productId === itemId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0);
        
        updateStoredCart(updatedCart);
        return updatedCart;
      },
      {
        fulfilled: (state, action) => {
          state.cartItems = action.payload;
        },
      }
    ),

    clearCart: create.asyncThunk(
      async () => {
        updateStoredCart([]);
        return [];
      },
      {
        fulfilled: (state, action) => {
          state.cartItems = action.payload;
        },
      }
    ),
  }),
  
  selectors: {
    selectCartCount: (cart) => cart.cartItems.length,
    selectTotalItems: (cart) => cart.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    selectCartItems: (cart) => cart.cartItems,
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart ,
  loadCart

} = cartSlice.actions;

export const {
  selectCartCount,
  selectTotalItems,
  selectCartItems,
} = cartSlice.selectors;