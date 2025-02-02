import { ICartItem, IProduct } from "@/lib/config/model";
import { createAppSlice } from "@/lib/createAppSlice";
import { fetchProductById } from "@/lib/utils/dataSource";

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
  cartItemDetails: IProduct[];
}

const initialState: CartState = {
  cartItems: [],
  cartItemDetails: [],
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
          updatedCart = [...state.cartItems, { productId: item, quantity: 1 }];
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
        const state = (getState() as { cart: CartState }).cart;
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
        const state = (getState() as { cart: CartState }).cart;
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

    getCartItemDetails: create.asyncThunk(
      async (_, { getState }) => {
        const state = (getState() as { cart: CartState }).cart;
        const productIds = state.cartItems.map(item => item.productId);
        const products = productIds.map(id => fetchProductById(id.toString()));
        const details = await Promise.allSettled(products);
        return details.map((detail, index) => {
          if (detail.status === 'fulfilled') {
            return detail.value;
          } else {
            return null
          }
        }).filter((detail): detail is IProduct => detail !== null);
      },
      {
        fulfilled: (state, action) => {
          state.cartItemDetails = action.payload;
        },
      }
    ),
  }),

  selectors: {
    selectCartCount: (cart) => cart.cartItems.length,
    selectTotalItems: (cart) => cart.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    selectCartItems: (cart) => cart.cartItems,
    selectCartIdemDetails: (cart) => cart.cartItemDetails,
    selectTotalAmount: (cart) => {
      return cart.cartItemDetails.reduce((sum, item) => {
        const cartItem = cart.cartItems.find(cartItem => cartItem.productId === item.id);
        return sum + (cartItem ? cartItem.quantity * item.price : 0);
      }, 0);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCart,
  getCartItemDetails,
} = cartSlice.actions;

export const {
  selectCartCount,
  selectTotalItems,
  selectCartItems,
  selectCartIdemDetails,
  selectTotalAmount,
} = cartSlice.selectors;