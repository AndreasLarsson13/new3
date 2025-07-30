import React, { useReducer, useEffect, useContext } from "react";
import { cartReducer, State, initialState } from "./cart.reducer";
import { Item, getItem } from "./cart.utils";
import { useLocalStorage } from "@utils/use-local-storage";

interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item["id"]) => void;
  clearItemFromCart: (id: Item["id"]) => void;
  getItemFromCart: (id: Item["id"]) => any | undefined;
  isInCart: (id: Item["id"]) => boolean;
  clearCart: () => void;  // Lägg till denna rad
}

export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};


// Recursive function to sanitize and serialize attributes
const sanitizeValue = (value: any) => {
  if (value === null || typeof value !== "object") return value; // Primitives are safe
  if (value instanceof HTMLElement || value['$$typeof']) return "[Circular]"; // DOM elements or React components
  if (Array.isArray(value)) return value.map(sanitizeValue); // Recursively sanitize arrays

  const sanitizedObject: any = {};
  for (const key in value) {
    sanitizedObject[key] = sanitizeValue(value[key]); // Recursively sanitize each property
  }
  return sanitizedObject;
};

const serializeAttributes = (attributes: any[]) => {
  return attributes.map((attr) => sanitizeValue(attr));
};

// Main function to serialize state for localStorage
const serializeState = (state: State) => ({
  items: state.items.map((item) => ({
    id: item.id ? item.id : item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    location: "item.location",
    attributes: "item.attributes ? serializeAttributes(item.attributes) : []",
    sku: item.sku,
    shippingSpecial: item.shippingSpecial,
    sale_price: item.sale_price

  })),
  isEmpty: state.isEmpty,
  totalItems: state.totalItems,
  totalUniqueItems: state.totalUniqueItems,
  total: state.total,
});


export const CartProvider: React.FC = ({ children }) => {
  const [savedCart, saveCart] = useLocalStorage(
    "natbutiken", //testasnu
    JSON.stringify(initialState)
  );

  const [state, dispatch] = useReducer(
    cartReducer,
    savedCart ? JSON.parse(savedCart) : initialState
  );

  // Save only the necessary properties of state to localStorage
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(serializeState(state));

      saveCart(serializedState);
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) => {
    console.log("Dispatching ADD_ITEM_WITH_QUANTITY", { item, quantity });
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
  };

  const removeItemFromCart = (id: Item["id"]) => {
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
  };

  const clearItemFromCart = (id: Item["id"]) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const clearCart = () => {
    dispatch({ type: "RESET_CART" });
  };

  const isInCart = (id: Item["id"]) => !!getItem(state.items, id);

  const getItemFromCart = (id: Item["id"]) => getItem(state.items, id);

  const value = {
    ...state,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    getItemFromCart,
    isInCart,
    clearCart
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
