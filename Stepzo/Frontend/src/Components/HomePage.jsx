import React, { useEffect } from "react";
import { useProductsStore } from "../Store/useProductsStore.js";
import { Heart, Loader } from "lucide-react";
import { useWishlistStore } from "../Store/useWishlistStore.js";
import Footer from "./Footer.jsx";
import { useAuthStore } from "../Store/useAuthStore.js";
import { useCartStore } from "../Store/useCartStore.js";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useAuthStore();
  const { getCart } = useCartStore();
  const { Products, getProducts, isProductLoading } = useProductsStore();
  const {
    addingProductId,
    addToWishlist,
    wishlistProductsId,
    getWishlist,
    removeitemfromwishlist,
  } = useWishlistStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (authUser) {
      getWishlist();
      getCart();
    }
  }, [authUser, getWishlist]);

  const getProductDetails = (productid) => {
    navigate(`productview/${productid}`);
  };
  const additemtowishlist = (id) => {
    addToWishlist(id);
  };

  return (
    <div>
      <div className="h-19"></div>
      <div
        className="h-[400px] w-full bg-center bg-cover bg-no-repeat md:h-[790px]"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgino6jbz/image/upload/v1744632803/Screen_Shot_2025-04-14_at_17.42.16_atppuz.png')",
        }}
      >
        <div className="flex justify-center items-center flex-col h-full bg-black/10 text-base-300">
          <h1 className="text-5xl font-semibold">STEPZO</h1>
          <p className="text-xl text-center max-w-3xl pt-5 px-5">
            Designed for your feet. Styled for your life.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl py-10">EXPLORE THE SELECTION</h1>
        <div className="flex justify-center items-center w-full px-5 pb-5 md:pt-2">
          <div className="carousel rounded-box min-w-50 max-w-90 hide-carousel">
            <div className="carousel-item w-full flex justify-center items-center flex-col cursor-pointer">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744710997/close-up-futuristic-sneakers_23-2151005668_11zon_fezth7.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">Sneakers</h1>
              </div>
            </div>
            <div className="carousel-item w-full flex justify-center items-center flex-col cursor-pointer">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744710997/dark-blue-show-rock_52683-94821_11zon_s0hz09.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">Loafers</h1>
              </div>
            </div>
            <div className="carousel-item w-full flex justify-center items-center flex-col cursor-pointer">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744710997/beautiful-straw-hat-with-blue-flip-flops-yellow-vibrant-vivid-background-top-view-flat-lay-summer-travel-vacation-concept_1220-1850_11zon_bhmmvb.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">Sandels</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 md:gap-20 hide-i-carousel">
            <div className="flex justify-between items-center flex-col cursor-pointer">
              <div className="min-w-[120px] max-w-[350px] ">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744710997/close-up-futuristic-sneakers_23-2151005668_11zon_fezth7.jpg"
                  alt="no image found"
                  className="h-full w-full"
                />
              </div>
              <p className="py-3 text-sm md:text-lg">Sneakers</p>
            </div>
            <div className="flex justify-between items-center flex-col cursor-pointer">
              <div className="min-w-[120px] max-w-[350px]">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744710997/dark-blue-show-rock_52683-94821_11zon_s0hz09.jpg"
                  alt="no image found"
                  className="h-full w-full"
                />
              </div>
              <p className="py-3 text-sm md:text-lg">Loafers</p>
            </div>
            <div className="flex justify-between items-center flex-col cursor-pointer">
              <div className="min-w-[120px] max-w-[350px]">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744710997/beautiful-straw-hat-with-blue-flip-flops-yellow-vibrant-vivid-background-top-view-flat-lay-summer-travel-vacation-concept_1220-1850_11zon_bhmmvb.jpg"
                  alt="no image found"
                  className="h-full w-full"
                />
              </div>
              <p className="py-3 text-sm md:text-lg">Sandels</p>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div
          className="h-[400px] w-full bg-center bg-cover bg-no-repeat md:h-[670px]"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/confident-european-lady-white-sneakers-sitting-chair-making-faces-portrait-wonderful-girl-posing_197531-9341.jpg?t=st=1744711743~exp=1744715343~hmac=884cab75be1d17d93eb74a836e18bf94d95af8664ed6bb1c10360e835ed5a320&w=1380')",
          }}
        ></div>
        <div className="z-10 bg-base-100">
          <div className="flex justify-center items-center flex-col pt-6">
            <h1 className="text-black/75 text-[10px] md:text-sm">UNISEX</h1>
            <h1 className="text-2xl md:text-3xl">Foot Wear</h1>
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
                {Products.slice(0, 6).map((product) => (
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
                            additemtowishlist(product.id);
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
                      <h1 className="text-sm text-black/65">
                        ₹ {product.price}
                      </h1>
                      <a className="link link-neutral">Shop Now</a>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center items-center py-10 mb-10">
            <button
              className="btn btn-outline p-6 rounded-4xl hover:bg-transparent hover:text-inherit hover:border-2 border-black transition-all duration-400 ease-in-out"
              onClick={() => {
                navigate("/products");
              }}
            >
              Discover The Selection
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-center items-center text-2xl font-semibold pt-10 pb-3 md:text-3xl">
          STEPZO SERVICES
        </div>
        <div className="flex justify-center items-center">
          <p className=" text-[15px] max-w-3xl text-center text-black/75 pb-7 px-2">
            Stepzo offers complimentary size consultations, book-a-try-on
            appointments, and a curated collection of sandals, sneakers, and
            loafers for a seamless footwear experience.
          </p>
        </div>
        <div className="flex justify-center items-center p-5">
          <div className="carousel rounded-box min-w-50 max-w-90 hide-carousel">
            <div className="carousel-item w-full flex justify-center items-center flex-col">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://glentshoes.com/new_glent/assets/img/cuidado-4.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">PERSONALIZATION</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
            <div className="carousel-item w-full flex justify-center items-center flex-col">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744635087/15236222-flatten-17ec4da8ea3c43b76504dfb931af9430-2_11zon_ze9gdo.png"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">BOOK AN APPOINTMENT</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
            <div className="carousel-item w-full flex justify-center items-center flex-col">
              <div className="flex justify-center items-center w-[100%] h-[90%] overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744635524/Mir_Alexis_a_pair_of_sneakers_shoes_with_laces_making_a_present_1e09d665-95ca-4c7e-ae0c-6948c87d235f_11zon_xsh82x.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">OTHER SERVICES</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center hide-i-carousel">
            <div className="w-full flex justify-center items-center flex-col min-w-50 max-w-95">
              <div className="w-full overflow-hidden p-2">
                <img
                  src="https://glentshoes.com/new_glent/assets/img/cuidado-4.jpg"
                  className="w-full h-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">PERSONALIZATION</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
            <div className="w-full flex justify-center items-center flex-col min-w-50 max-w-95">
              <div className="w-full overflow-hidden p-2">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744635087/15236222-flatten-17ec4da8ea3c43b76504dfb931af9430-2_11zon_ze9gdo.png"
                  className=""
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">BOOK AN APPOINTMENT</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>{" "}
            <div className="w-full flex justify-center items-center flex-col min-w-50 max-w-95">
              <div className="w-full overflow-hidden p-2 mx-auto">
                <img
                  src="https://res.cloudinary.com/dgino6jbz/image/upload/v1744635524/Mir_Alexis_a_pair_of_sneakers_shoes_with_laces_making_a_present_1e09d665-95ca-4c7e-ae0c-6948c87d235f_11zon_xsh82x.jpg"
                  className="w-full h-full object-cover"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
              <div className="flex justify-center items-center flex-col p-3">
                <h1 className="font-sm text-black ">Other Services</h1>
                <a className="link link-neutral py-2">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
