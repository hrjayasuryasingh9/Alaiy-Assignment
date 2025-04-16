import React, { useState } from "react";
import Drawer from "./Drawer";
import {
  AlignJustify,
  User,
  ShoppingBag,
  Plus,
  Heart,
  CalendarArrowUp,
  CircleUser,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../Store/useWishlistStore";
import { useCartStore } from "../Store/useCartStore";
import { useProductsStore } from "../Store/useProductsStore";

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { authUser, Logoutuser } = useAuthStore();
  const { wishlistProductsId } = useWishlistStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const { Products } = useProductsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const wishlistlength = wishlistProductsId.length;
  const cartLength = cart.length;
  const handleLogout = () => {
    Logoutuser();
  };
  const toggleDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const results = Products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
    setShowDropdown(true);
  };

  const handleSelectProduct = (productName, productid) => {
    setSearchQuery(productName);
    setShowDropdown(false);
    console.log(productid);
    navigate(`/productview/${productid}`);
  };

  return (
    <div>
      <div className="fixed navbar bg-base-100 shadow-sm px-5 z-10 h-20">
        <div className="navbar-start">
          <div className="relative hidden sm:block pl-2 hide-i-carousel">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-70 md:w-70"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            />
            {showDropdown && filteredProducts.length > 0 && (
              <ul className="absolute mt-1 z-50 bg-base-100 border rounded-md w-full shadow-md max-h-[200px] overflow-scroll">
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                    onMouseDown={() => {
                      console.log(product);
                      handleSelectProduct(product.name, product.id);
                    }}
                  >
                    <div className="flex justify-start w-full items-center">
                      <span>
                        <img src={product.images} alt="" className="h-9" />
                      </span>
                      <span>{product.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <a
              className="text-xl not-sm:inline hidden font-bold cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              S T E P Z O
            </a>
          </div>
        </div>
        <div className="navbar-center sm:inline hidden">
          <a
            className="text-3xl font-semibold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            S T E P Z O
          </a>
        </div>
        <div className="navbar-end gap-2 md:gap-5">
          {authUser ? (
            <div className="gap-3 md:gap-5 flex justify-center items-center">
              <div className="flex justify-center align-middle hover:cursor-pointer">
                <div className="indicator ">
                  <span className="indicator-item badge rounded-full bg-black text-base-100 text-[9px] border-none w-[9px] h-[18px] md:text-[10px] md:w-[13px] md:h-[22px]">
                    {cartLength}
                  </span>
                  <ShoppingBag
                    className="size-5 md:size-6"
                    onClick={() =>
                      authUser
                        ? navigate("/cart")
                        : toast.error("Please login to access your wishlist")
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center align-middle hover:cursor-pointer">
                <div className="indicator ">
                  <span className="indicator-item badge rounded-full bg-black text-base-100 text-[9px] border-none w-[9px] h-[18px] md:text-[10px] md:w-[13px] md:h-[22px]">
                    {wishlistlength}
                  </span>
                  <Heart
                    className="size-5 md:size-6"
                    onClick={() =>
                      authUser
                        ? navigate("/wishlist")
                        : toast.error("Please login to access your wishlist")
                    }
                  />
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex justify-center align-middle hover:cursor-pointer"
                >
                  <User className="size-5.5 md:size-6" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-40 p-2 shadow"
                >
                  <li>
                    <a className="text-lg cursor-pointer">
                      <CircleUser className="size-4" />
                      {authUser ? authUser.data.name : ""}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-lg cursor-pointer"
                      onClick={() => {
                        navigate("/orders");
                      }}
                    >
                      <CalendarArrowUp className="size-4" />
                      My orders
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-lg cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <span></span>
          )}
          <div className="hover:cursor-pointer hidden md:inline group hide-i-carousel">
            <div className="flex justify-center align-middle font-semibold">
              <Plus className="size-4 font-bold mt-1.5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
              <span className="mb-0.5">Contact Us</span>
            </div>
          </div>
          <div>
            <div
              className="flex justify-center align-middle hover:cursor-pointer"
              onClick={toggleDrawer}
            >
              <AlignJustify className="size-6 md:size-7 sm:inline mt-0.5" />
              <span className="pl-1 font-semibold sm:inline hidden">Menu</span>
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default Navbar;
