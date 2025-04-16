import React, { useEffect, useState } from "react";
import { usePaymentStore } from "../Store/usePaymentStore";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Orders = () => {
  const { isGettingOrders, Orders, getOrders } = usePaymentStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const getProductDetails = (productId) => {
    navigate(`/productview/${productId}`);
  };

  // Flatten all order_details into one array
  const flattenedOrders = Orders.flatMap((order) =>
    order.order_details.map((product) => ({
      ...product,
      orderDate: order.created_at,
    }))
  );

  const totalProducts = flattenedOrders.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const paginatedProducts = flattenedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pt-20">
      <div className="bg-base-100 w-full min-h-screen">
        <div className="text-xl border-b-1 border-black/25 py-6 px-5">
          My Orders ({totalProducts})
        </div>

        <div className="flex justify-around items-center w-full">
          {isGettingOrders ? (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center px-5 py-5 md:px-10 w-280">
              {Array(8)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="skeleton w-full min-w-38 max-w-75 h-50 md:h-90"
                  ></div>
                ))}
            </ul>
          ) : (
            <>
              <ul className="grid grid-cols-2 md:grid-cols-4 justify-items-center p-5 md:p-10 w-280 border-b-black">
                {paginatedProducts.map((product, index) => (
                  <div
                    key={index}
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
                      <div className="text-sm text-black/65 flex justify-between gap-3 px-4">
                        <h1>Qty: {product.quantity}</h1>
                        <h1>₹ {product.products.price * product.quantity}</h1>
                      </div>
                      <div className="text-xs text-gray-500 pt-1">
                        Ordered on:{" "}
                        {new Date(product.orderDate).toLocaleDateString()}
                      </div>
                      <div className="w-full flex px-2 justify-center items-center pt-2">
                        <a
                          className={`text-center ${(() => {
                            const daysAgo = Math.floor(
                              (Date.now() - new Date(product.orderDate)) /
                                (1000 * 60 * 60 * 24)
                            );
                            if (daysAgo < 1) return "text-yellow-500";
                            if (daysAgo < 2) return "text-blue-500";
                            if (daysAgo < 3) return "text-green-400";
                            return "text-gray-500";
                          })()}`}
                        >
                          {(() => {
                            const daysAgo = Math.floor(
                              (Date.now() - new Date(product.orderDate)) /
                                (1000 * 60 * 60 * 24)
                            );
                            if (daysAgo < 1) return "Pending";
                            if (daysAgo < 2) return "Shipped";
                            if (daysAgo < 3) return "Delivered";
                            return "Unknown";
                          })()}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="btn btn-outline"
            >
              Previous
            </button>
            <span className="text-sm text-black/70">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="btn btn-outline"
            >
              next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
