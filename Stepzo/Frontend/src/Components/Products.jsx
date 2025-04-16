import React, { useState } from "react";
import { useProductsStore } from "../Store/useProductsStore";
import { useWishlistStore } from "../Store/useWishlistStore";
import { useNavigate } from "react-router-dom";
import { Heart, Loader } from "lucide-react";
import Footer from "./Footer";

const Products = () => {
  const navigate = useNavigate();
  const { isProductLoading, Products } = useProductsStore();
  const {
    addingProductId,
    removeitemfromwishlist,
    addToWishlist,
    wishlistProductsId,
  } = useWishlistStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 6;

  const categories = ["All", ...new Set(Products.map((p) => p.category))];


  const filteredProducts =
    selectedCategory === "All"
      ? Products
      : Products.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getProductDetails = (productid) => {
    navigate(`/productview/${productid}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="">
      <div
        className="h-[400px] w-full bg-[30%] bg-cover bg-no-repeat md:h-[770px]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/pleasant-young-woman-posing-bricked-wall-outdoor-shot-european-woman_197531-14528.jpg?t=st=1744805416~exp=1744809016~hmac=e4f65f7ce63bf4e3d1d86e3ed83b116a401dd89023b86c27156fbbfc632b352d&w=1380')",
        }}
      ></div>

      <div className="text-3xl pt-10 px-6 text-center">Our Collection</div>
      <div className="flex justify-center mt-6 px-5">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="select select-bordered w-full max-w-xs"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-around items-center w-full">
        {isProductLoading ? (
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
            {paginatedProducts.map((product) => (
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
                      className="absolute size-5 top-3 right-3 fill-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeitemfromwishlist(product.id);
                      }}
                    />
                  ) : (
                    <Heart
                      className="absolute size-5 top-3 right-3 text-black"
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
        )}
      </div>

      {/* Pagination Controls */}
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
            Next
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;
