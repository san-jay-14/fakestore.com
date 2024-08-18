import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-4  border-solid rounded-full animate-spin border-orange-500"></div>
    </div>
  );
};

export default LoadingSpinner;
