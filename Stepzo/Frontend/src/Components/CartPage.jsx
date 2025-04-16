import {
  Minus,
  Plus,
  Trash2,
  CreditCard,
  ShoppingBag,
  Loader,
} from "lucide-react";
import Footer from "./Footer";
import { useCartStore } from "../Store/useCartStore";
import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "../Store/usePaymentStore";
import { useEffect } from "react";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    isGettingcart,
    getCart,
    addingProductTocart,
    changeQuantity,
  } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const { redirectToStripeCheckout, isRedirrectingToPaymentPage } =
    usePaymentStore();
  const navigate = useNavigate();
  const getProductDetails = (productid) => {
    navigate(`/productview/${productid}`);
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.products.price * item.quantity;
  }, 0);

  const handelCheckout = (e) => {
    e.preventDefault();
    redirectToStripeCheckout(cart);
  };
  const shippingCost = subtotal > 0 ? 99 : 0;
  const totalPrice = subtotal + shippingCost;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-white w-full pt-20">
        <div className="text-xl border-b border-black/25 py-6 px-5 font-medium">
          My Cart ({cart.length})
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Cart Items Section */}
          <div className="flex-grow overflow-scroll">
            <div className="flex justify-around items-center w-full">
              {isGettingcart ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center px-5 py-5 md:px-10 w-full">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="skeleton w-full h-64 bg-gray-200 animate-pulse rounded-md"
                      ></div>
                    ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-2 md:grid-cols-3 justify-items-center p-5 md:p-10 w-280 border-b-black ">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="border-black/25 cursor-pointer border-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        getProductDetails(product.products.id);
                      }}
                    >
                      <div className="min-w-38 max-w-100 relative">
                        <img
                          src={product.products.images}
                          alt={product.products.name}
                          className="h-[100%] w-[100%] object-cover"
                        />
                      </div>
                      <div className="py-3 pb-4 flex justify-center items-center flex-col">
                        <div className="flex justify-center items-center text-center text-[13px] text-black font-medium px-2 min-w-[100px] max-w-full">
                          {product.products.name}
                        </div>
                        <h1 className="text-sm text-black/65">
                          ₹ {product.products.price}
                        </h1>
                        <div className="flex items-center mt-2 space-x-2">
                          <button
                            className="p-1 border rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newQty = product.quantity - 1;
                              if (newQty >= 1) {
                                useCartStore
                                  .getState()
                                  .changeQuantity(product.id, newQty);
                              }
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2">{product.quantity}</span>
                          <button
                            className="p-1 border rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newQty = product.quantity + 1;
                              useCartStore
                                .getState()
                                .changeQuantity(product.id, newQty);
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="w-full flex justify-center px-2 items-center ">
                          {addingProductTocart === product.products.id ? (
                            <Loader className=" size-5 animate-spin " />
                          ) : (
                            <a
                              className="link-neutral link"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(product.products.id);
                              }}
                            >
                              Remove From Cart
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </div>

            {cart.length === 0 && !isGettingcart && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-gray-500">
                  Add items to your cart to see them here
                </p>
              </div>
            )}
          </div>

          {/* Checkout Summary Section */}
          <div className="lg:w-85 p-3 lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-900 mb-5 flex items-center w-full">
                <ShoppingBag className="h-5 w-5 mr-2 " />
                Order Summary
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cart.length} items)
                  </span>
                  <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ₹ {shippingCost.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="">₹ {totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including taxes and fees
                  </p>
                </div>
              </div>

              <button
                className="w-full mt-6 btn btn-neutral"
                disabled={cart.length === 0}
                onClick={handelCheckout}
              >
                {isRedirrectingToPaymentPage ? (
                  <Loader className="animate-spin size-5" />
                ) : (
                  <span className="flex justify-center items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    CheckOut
                  </span>
                )}
              </button>

              <div className="mt-4 text-xs text-center text-gray-500">
                <p>Secure payment provided by Stripe</p>
                <p className="mt-1">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
