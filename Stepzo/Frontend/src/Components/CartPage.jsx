import React from "react";

const CartPage = () => {
  return (
    <div className="">
      <div className="bg-base-100 w-full pt-20 min-h-screen">
        <div className="text-xl border-b-1 border-black/25 py-6 px-5">
          My Wishlist ({cartlength})
        </div>
        <div className="flex justify-around items-center w-full">
          {isgettingWishlist ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-10 justify-items-center px-5 py-5 md:px-10 w-280">
              {Array(6)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="skeleton w-full min-w-38 max-w-75 h-50 md:h-90"
                  ></div>
                ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 justify-items-center p-5 md:p-10 w-280 border-b-black ">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="border-black/25 cursor-pointer border-1"
                  onClick={getProductDetails}
                >
                  <div className="min-w-38 max-w-100 relative">
                    {addingProductId === product.products.id ? (
                      <Loader className="absolute size-5 top-3 right-3 animate-spin" />
                    ) : wishlistProductsId.includes(product.products.id) ? (
                      <Heart
                        className="absolute size-5 top-3 right-3 fill-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeitemfromwishlist(product.products.id);
                        }}
                      />
                    ) : (
                      <Heart
                        className="absolute size-5 top-3 right-3 text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          additemtowishlist(product.products.id);
                        }}
                      />
                    )}

                    <img
                      src={product.products.images}
                      alt={product.products.name}
                      className="h-[100%] w-[100%] object-cover"
                    />
                  </div>
                  <div className="py-3 pb-4 flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center text-center text-[13px] text-black font-medium px-2">
                      {product.products.name}
                    </div>
                    <h1 className="text-sm text-black/65">
                      ₹ {product.products.price}
                    </h1>
                    <a className="link link-neutral">Shop Now</a>

                    <div className="relative w-full">
                      {addingProductId === product.products.id ? (
                        <Loader className="absolute size-5 -top-5 right-3 animate-spin " />
                      ) : wishlistProductsId.includes(product.products.id) ? (
                        <a
                          className="link-neutral link absolute  -top-6 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeitemfromwishlist(product.products.id);
                          }}
                        >
                          In Cart
                        </a>
                      ) : (
                        <ShoppingBag
                          className="absolute size-5 -top-5 right-3 text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            additemtowishlist(product.products.id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer className="" />
    </div>
  );
};

export default CartPage;
