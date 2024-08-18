import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl font-semibold mt-4">Oops! Page not found.</p>
      <p className="text-gray-700 mt-2">
        The page you are looking for might have been moved or deleted.
      </p>
      <Link href="/products">
        <p className="mt-4 px-6 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-300">
          Go to Home
        </p>
      </Link>
    </div>
  );
};

export default Custom404;
