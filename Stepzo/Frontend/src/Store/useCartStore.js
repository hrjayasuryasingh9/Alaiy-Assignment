import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { addToWishlist } from "../../../Backend/src/Services/wishlistServices";

export const useCartStore = create((get, set) => ({
  isGettingcart: false,
  addingProductTocart: null,
  cartProductIds: [],
  cart: [],
  addToWishlist: async (id) => {
    try {
      set({ addingProductTocart: id });
      const data = { pid: id, quantity: 1 };
      const item = await axiosInstance.post("/cart/addtocart", data);
      const { cartProductIds, cart } = get();
      const itemdata = item.data.data;
      const updatedCart = [...cart, itemdata];
      const updatedIds = [...cartProductIds, id];
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
      toast.success("Product Removed From The wishlist");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ addingProductTocart: null });
    }
  },
}));
