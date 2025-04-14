import * as productServices from "../Services/productServices.js";

const getProducts = async (req, res) => {
  try {
    const products = await productServices.getProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Servber error" });
  }
};
export { getProducts };
