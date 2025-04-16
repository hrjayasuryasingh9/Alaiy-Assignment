import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../Store/useProductsStore";
import Footer from "./Footer";
import { Heart, Loader } from "lucide-react";
import { useWishlistStore } from "../Store/useWishlistStore";
import { useCartStore } from "../Store/useCartStore";
const ProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { Products } = useProductsStore();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    addingProductId,
    addToWishlist,
    wishlistProductsId,
    getWishlist,
    removeitemfromwishlist,
  } = useWishlistStore();

  const { addingProductTocart, cartProductIds, addToCart, removeFromCart } =
    useCartStore();
  const product = Products.find((item) => item.id === parseInt(id));
  const recommend = Products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  const getProductDetails = (productid) => {
    navigate(`/productview/${productid}`);
  };
  if (!product) {
    return <div className="text-red-500 p-20">Product not found.</div>;
  }
  console.log(product);
  return (
    <div>
      <div className="flex justify-center items-center pt-19 md:h-screen flex-col md:flex-row">
        <div className="w-full relative bg-gray-200 overflow-hidden  md:w-[50%] md:h-[99%]">
          {addingProductId === product.id ? (
            <Loader className="absolute size-5 top-5 right-5 animate-spin" />
          ) : wishlistProductsId.includes(product.id) ? (
            <Heart
              className="absolute size-5 top-5 right-5 fill-black cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeitemfromwishlist(product.id);
              }}
            />
          ) : (
            <Heart
              className="absolute size-5 top-5 right-5 text-black cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                addToWishlist(product.id);
              }}
            />
          )}
          <img src={product.images} alt="" className="" />
        </div>
        <div className="w-full md:w-[50%] bg-gray-200 p-10 flex flex-col justify-center items-center md:h-[99%] md:bg-white">
          <div className="text-xl font-semibold py-4">{product.name}</div>
          <div className="font-semibold pb-3">₹ {product.price}</div>
          <h2 className="text-lg text-black/75 pb-2">
            Category: {product.category}
          </h2>
          <h2 className="text-lg text-black/75 pb-3">
            {product.availability ? "Availabe" : "Not available"}
          </h2>
          <h1 className="max-w-sm text-center pb-4">{product.description}</h1>

          {addingProductTocart === product.id ? (
            <button className="btn btn-neutral w-[80%] my-6 py-3">
              <Loader className="animate-spin size-5" />
            </button>
          ) : cartProductIds.includes(product.id) ? (
            <button
              className="btn btn-neutral w-[80%] my-6 py-3"
              onClick={() => {
                removeFromCart(product.id);
              }}
            >
              REMOVE FROM CART
            </button>
          ) : (
            <button
              className="btn btn-neutral w-[80%] my-6 py-3"
              onClick={() => {
                addToCart(product.id);
              }}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="z-10 bg-base-100 pt-5">
          <div className="flex justify-center items-center flex-col pt-6">
            <h1 className="text-2xl md:text-3xl">YOU MAY ALSO LIKE</h1>
          </div>
          <div className="flex justify-around items-center w-full">
            <ul className="grid grid-cols-2 md:grid-cols-3 justify-items-center p-5 md:p-10 w-280 border-b-black ">
              {recommend.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="border-black/25 cursor-pointer border-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    getProductDetails(product.id);
                  }}
                >
                  <div className="min-w-38 max-w-100 relative">
                    {addingProductId === product.id ? (
                      <Loader className="absolute size-5 top-3 right-3 animate-spin" />
                    ) : wishlistProductsId.includes(product.id) ? (
                      <Heart
                        className="absolute size-5 top-3 right-3 fill-black cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeitemfromwishlist(product.id);
                        }}
                      />
                    ) : (
                      <Heart
                        className="absolute size-5 top-3 right-3 text-black cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(product.id);
                        }}
                      />
                    )}

                    <img
                      src={product.images}
                      alt={product.name}
                      className="h-[100%] w-[100%] object-cover"
                    />
                  </div>
                  <div className="py-3 pb-4 flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center text-center text-[13px] text-black font-medium px-2">
                      {product.name}
                    </div>
                    <h1 className="text-sm text-black/65">₹ {product.price}</h1>
                    <a className="link link-neutral">Shop Now</a>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-center py-10 mb-10">
            <button className="btn btn-outline p-6 rounded-4xl hover:bg-transparent hover:text-inherit hover:border-2 border-black transition-all duration-400 ease-in-out">
              Discover The Selection
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;
