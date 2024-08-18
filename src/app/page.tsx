"use client";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <section
        className="bg-cover bg-center h-screen relative"
        style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to FakeStore</h1>
            <p className="text-lg mb-6">
              Discover the best deals on top products. Shop now and enjoy
              exclusive offers!
            </p>
            <Link href="/products">
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
