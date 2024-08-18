"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CartItem from "../components/CartItem";
import Modal from "../components/Modal";
import ProductCard from "../components/ProductCard"; // Import ProductCard
import { useRouter } from "next/navigation";
import Link from "next/link";
import right from "../../../public/right.svg";
import LoadingSpinner from "../components/LoadingSpinner";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [invalidCoupon, setInvalidCoupon] = useState<string>("");
  const [showBurst, setShowBurst] = useState<boolean>(false);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const router = useRouter();

  const coupons = [
    { code: "SAVE10", discount: 0.1, description: "Save 10% on your order" },
    { code: "SAVE20", discount: 0.2, description: "Save 20% on your order" },
    { code: "FREESHIP", discount: 0.05, description: "5% off + Free Shipping" },
    { code: "BOGO50", discount: 0.5, description: "Buy One Get One 50% Off" },
    {
      code: "WELCOME15",
      discount: 0.15,
      description: "15% off for new customers",
    },
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClick = () => {
    router.push("/404");
  };

  const handleApplyCoupon = () => {
    const selectedCoupon = coupons.find((coupon) => coupon.code === couponCode);
    if (selectedCoupon) {
      setDiscount(selectedCoupon.discount);
      setInvalidCoupon("");
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 500);
    } else {
      setDiscount(0);
      setInvalidCoupon("Invalid coupon code. Please try again.");
      setTimeout(() => setInvalidCoupon(""), 3000);
    }
  };

  const handleSelectCoupon = (code: string) => {
    setCouponCode(code);
    setIsModalOpen(false);
  };

  const total = subtotal - subtotal * discount;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (cartItems.length > 0) {
        const lastItem = cartItems[cartItems.length - 1];
        setLoadingProducts(true);
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${lastItem.category}`
          );
          const data = await response.json();
          setCategoryProducts(data);
        } catch (error) {
          console.error("Error fetching category products:", error);
        } finally {
          setLoadingProducts(false);
        }
      }
    };

    fetchCategoryProducts();
  }, [cartItems]);

  return (
    <div className="min-h-screen p-6 bg-white">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-lg mb-4">
            It looks like you haven’t added any items to your cart yet.
          </p>
          <p className="text-md mb-6">
            Browse our products and add your favorites to the cart.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Side - Cart Items */}
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right Side - Payment and Checkout */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">
              Subtotal : ${subtotal.toFixed(2)}
            </h2>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border rounded p-2 mr-2 w-[50%]"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 rounded-md border border-orange-300 bg-orange-500 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              >
                Apply Coupon
              </button>
            </div>
            {invalidCoupon && (
              <p className="text-red-500 mt-2">{invalidCoupon}</p>
            )}
            <p
              className="font-semibold underline mt-2"
              style={{
                color: "#FF7F3E",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              View Coupons
            </p>
            {discount > 0 && (
              <div
                className={`mt-2 text-green-500 ${
                  showBurst ? "burst-animation" : ""
                }`}
              >
                Coupon applied! You saved ${(subtotal * discount).toFixed(2)}.
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4">
              Total: ${total.toFixed(2)}
            </h2>

            <button
              onClick={handleClick}
              className="w-full mt-5 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Available Coupons</h2>
          <ul className="space-y-2">
            {coupons.map((coupon) => (
              <li
                key={coupon.code}
                onClick={() => handleSelectCoupon(coupon.code)}
                className="cursor-pointer p-2 border rounded hover:bg-gray-200"
              >
                <strong>{coupon.code}</strong>: {coupon.description}
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {/* Category Products */}
      {cartItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Browse More in {cartItems[cartItems.length - 1].category}
          </h2>
          {loadingProducts ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4 items-center">
              {categoryProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  category={product.category}
                  rating={product.rating}
                />
              ))}
              <Link href="/products">
                <div className="flex justify-center px-4 py-2 rounded-md border border-orange-500 bg-orange-600 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                  <p>Shop more</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
