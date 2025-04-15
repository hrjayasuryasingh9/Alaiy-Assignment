import prisma from "../../prisma/prismaclient.js";

const addToWishlist = async (uid, pid) => {
  const item = await prisma.wishlist.create({
    data: {
      uid: uid,
      pid: pid,
    },
    select: {
      id: true,
      added_at: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          category: true,
          images: true,
        },
      },
    },
  });
  return item;
};

const getWishlistItems = async (uid) => {
  const wishlist = await prisma.wishlist.findMany({
    where: { uid: uid },
    orderBy: { added_at: "desc" },
    select: {
      id: true,
      added_at: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          category: true,
          images: true,
        },
      },
    },
  });
  return wishlist;
};

const deletefromWishlist = async (id) => {
  const item = await prisma.wishlist.delete({
    where: {
      id: id,
    },
  });
  return item;
};

export { addToWishlist, getWishlistItems, deletefromWishlist };
