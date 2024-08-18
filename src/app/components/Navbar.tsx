// src/app/components/Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { filterProductsByCategory } from "../slices/productsSlice";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import person from "../../../public/person.svg";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(filterProductsByCategory(searchQuery));
    } else {
      dispatch(filterProductsByCategory(""));
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  return (
    <nav
      className="p-4 mb-4 flex justify-between items-center sticky top-0 z-50 shadow-md"
      style={{
        backgroundColor: "white",
      }}
    >
      {/* Logo */}
      <Link href="/products">
        <div className="relative cursor-pointer">
          <span
            className="text-3xl max-sm:text-xl font-bold font-inter transition-transform duration-300 hover:scale-105"
            style={{
              color: "#FF7F3E",
            }}
          >
            Fakestore.com
          </span>
        </div>
      </Link>

      {/* Search Bar */}
      <div className="flex-grow max-w-md mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-md max-sm:w-[70%]"
          style={{
            backgroundColor: "#DDDDDD",
          }}
          placeholder="Search products..."
        />
      </div>

      {/* Cart Icon */}
      <div className="flex gap-8">
        <Image src={person} alt="person" width={30} height={30} />
        <Link href="/cart">
          <div
            className={`relative cursor-pointer mr-3 transform transition-transform duration-300 ${
              animate ? "scale-125" : "scale-100"
            }`}
          >
            <FaShoppingCart size={30} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-orange-600 text-center text-xs text-white rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
