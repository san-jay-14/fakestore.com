// src/app/components/Category.tsx
import React from "react";

interface CategoryProps {
  onCategoryClick: (category: string) => void;
}

const categories = [
  "All",
  "Electronics",
  "Jewelery",
  "Men's Clothing",
  "Women's Clothing",
];

const Category: React.FC<CategoryProps> = ({ onCategoryClick }) => {
  return (
    <div className="flex space-x-4 p-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
