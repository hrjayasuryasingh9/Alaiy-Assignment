import * as cartServices from "../Services/cartServices.js";

const addToCart = async (req, res) => {
  const uid = req.user.id;
  const pid = req.body.pid;
  const quantity = req.body.quantity;
  if (!uid || !quantity || !pid) {
    res.status(400).json({ message: "Please Fill out all the fields" });
  }
  console.log(uid, pid, quantity);
  try {
    const item = await cartServices.addToCart(uid, pid, quantity);
    res
      .status(200)
      .json({ message: "item addded to cart successfully", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const uid = req.user.id;
    const cartItems = await cartServices.getCartItems(uid);
    res.status(200).json({ data: cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const item = await cartServices.deleteCartItem(id);

    res
      .status(200)
      .json({ message: "The Item is deleted from the cart ", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const quantity = req.body.quantity;
    const uid = req.user.id;
    const updated = await cartServices.updateCartItem(uid, id, quantity);
    res.status(200).json({ message: "The quantity is updated", data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addToCart, getCartItems, deleteCartItem, updateCartItem };
