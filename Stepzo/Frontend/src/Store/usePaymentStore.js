import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51RENJhQeRv1DP798sWMBCZSTpIS7rwtJcqcQ2UGod8T15KnszcCUDW0MAchAgL1Q8jv21E8LwT5s210NNpUBVu1a00IjeIRvWc"
);

export const usePaymentStore = create((set, get) => ({
  isGettingOrders: false,
  Orders: [],
  isRedirectingToPaymentPage: false,
  redirectToStripeCheckout: async (cart) => {
    set({ isRedirectingToPaymentPage: true });
    const items = cart.map((item) => ({
      id: item.products.id,
      name: item.products.name,
      Image: item.products.images,
      price: item.products.price,
      quantity: item.quantity,
    }));
    try {
      const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        items
      );
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (err) {
      console.error("Stripe redirect error:", err);
      set({ isRedirectingToPaymentPage: false });
    } finally {
      set({ isRedirectingToPaymentPage: false });
    }
  },
  createOrders: async (sessionId) => {
    try {
      const data = await axiosInstance.post("/payment/create-orders", {
        sessionId: sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrders: async () => {
    try {
      set({ isGettingOrders: true });
      const orders = await axiosInstance.get("/payment/getorders");
      set({ Orders: orders.data });
      console.log(orders.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ isGettingOrders: false });
    }
  },
}));
