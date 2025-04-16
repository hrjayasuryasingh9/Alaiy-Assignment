import prisma from "../../prisma/prismaclient.js";

const addToOrders = async (uid, orders) => {
  const order = await prisma.orders.create({
    data: {
      user_id: uid,
    },
  });
  const orderDetails = await Promise.all(
    orders.map((item) =>
      prisma.order_details.create({
        data: {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
        },
      })
    )
  );
  return orderDetails;
};

const getOrderDetails = async (uid) => {
  const orders = await prisma.orders.findMany({
    where: {
      user_id: uid,
    },
    include: {
      order_details: {
        include: {
          products: {
            select: {
              id: true,
              name: true,
              images: true,
              price: true,
            },
          },
        },
      },
    },
  });
  return orders;
};

export { addToOrders, getOrderDetails };
