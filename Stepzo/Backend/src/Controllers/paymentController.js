import Stripe from "stripe";
import * as orderServices from "../Services/orderServices.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_API);

const CheckoutPayment = async (req, res) => {
  const items = req.body;

  console.log(items);
  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.F_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.F_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        user_id: req.user.id,
        cart: JSON.stringify(
          items.map(({ id, quantity }) => ({ product_id: id, quantity }))
        ),
      },
    });
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};

const getSessionDetails = async (req, res) => {
  const sessionId = req.body.sessionId;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = Number(session.metadata.user_id);

    const cartItems = JSON.parse(session.metadata.cart);

    const orders = cartItems.map((item) => {
      const { product_id, quantity } = item;
      return {
        product_id,
        quantity,
      };
    });

    const data = await orderServices.addToOrders(userId, orders);
    console.log(data);
    res.status(200).json({ message: "The Orders are created successfully" });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrders = async (req, res) => {
  const uid = req.user.id;
  try {
    const Orders = await orderServices.getOrderDetails(uid);
    res.status(200).json(Orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { CheckoutPayment, getSessionDetails, getOrders };
