import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  isGettingcart: false,
  addingProductTocart: null,
  cartProductIds: [],
  cart: [],
  addToCart: async (id) => {
    try {
      set({ addingProductTocart: id });
      const data = { pid: id, quantity: 1 };
      const item = await axiosInstance.post("/cart/addtocart", data);
      const { cartProductIds, cart } = get();
      const itemdata = item.data.data;
      console.log(itemdata);
      const updatedCart = [...cart, itemdata];
      const updatedIds = [...cartProductIds, id];
      console.log(updatedCart);
      set({ cartProductIds: updatedIds, cart: updatedCart });
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ addingProductTocart: null });
    }
  },
  getCart: async () => {
    try {
      set({ isGettingcart: true });
      const response = await axiosInstance.get("/cart/getcartitems");
      console.log(response);
      const cart = response.data.data;
      const cartProductIds = cart.map((item) => item.products.id);
      set({ cart: cart, cartProductIds: cartProductIds });
      console.log(cart);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isGettingcart: false });
    }
  },
  removeFromCart: async (pid) => {
    try {
      set({ addingProductTocart: pid });
      const { cart, cartProductIds } = get();
      const itemToRemove = cart.find((item) => item.products.id === pid);
      const response = await axiosInstance.delete(
        `/cart/deletecartitem/${itemToRemove.id}`
      );
      const updatedCart = cart.filter((item) => item.products.id !== pid);
      const updatedIds = cartProductIds.filter((itemId) => itemId !== pid);
      set({ cart: updatedCart, cartProductIds: updatedIds });
      toast.success("Product Removed From The Cart");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ addingProductTocart: null });
    }
  },
  changeQuantity: async (cartId, newQuantity) => {
    try {
      await axiosInstance.patch(`/cart/updatecartitem/${cartId}`, {
        quantity: newQuantity,
      });
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === cartId
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        ),
      }));
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  },
}));
