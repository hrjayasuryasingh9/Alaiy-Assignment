import prisma from "../../Prisma/prismaclient.js";

const getProducts = async () => {
  const products = await prisma.products.findMany();
  return products;
};
export { getProducts };
