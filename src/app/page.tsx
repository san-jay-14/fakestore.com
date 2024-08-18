"use client";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to the E-commerce Store</h1>
      <Link href="/products">
        <span className="text-blue-500">Shop Products</span>
      </Link>
    </div>
  );
};

export default HomePage;
