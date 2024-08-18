// src/app/products/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../slices/productsSlice";
import { RootState, AppDispatch } from "../../store";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const products = useSelector(
    (state: RootState) => state.products.filteredItems
  );
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            description={product.description}
            rating={product.rating}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
