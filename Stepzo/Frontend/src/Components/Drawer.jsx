// Components/Drawer.jsx
import React from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useProductsStore } from "../Store/useProductsStore";

const Drawer = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { Products } = useProductsStore();
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
    onClose();
    navigate(`/productview/${productid}`);
  };

  const { authUser, Logoutuser } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleSignUp = () => {
    onClose();
    navigate("/signup");
  };
  const handleLogout = () => {
    onClose();
    Logoutuser();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 pl-3 h-full w-90 bg-base-200 shadow-lg z-50 transform transition-transform duration-500 md:w-140 md:pl-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center bg-base-200">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="text-xl btn btn-neutral btn-circle p-3"
          >
            X
          </button>
        </div>
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-xl font-semibold">
          <li className="w-full">
            <div className="relative flex pl-2 hide-carousel font-normal text-sm w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="input w-full"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              />
              {showDropdown && filteredProducts.length > 0 && (
                <ul className="absolute mt-1 z-50 bg-base-100 border rounded-md w-[80%] shadow-md max-h-[200px] overflow-scroll top-13">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                      onMouseDown={() =>
                        handleSelectProduct(product.name, product.id)
                      }
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
          </li>
          {!authUser ? (
            <div>
              <li>
                <a onClick={handleLogin}>
                  <LogIn className="size-5" />
                  Login
                </a>
              </li>
              <li>
                <a onClick={handleSignUp}>
                  <UserPlus className="size-5" />
                  Signup
                </a>
              </li>
            </div>
          ) : (
            <li>
              <a className="text-lg cursor-pointer" onClick={handleLogout}>
                <LogOut className="size-5" />
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Drawer;
