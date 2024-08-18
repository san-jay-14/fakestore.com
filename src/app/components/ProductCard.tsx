import React from "react";
import { Product } from "../slices/productsSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartslice";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  description,
  category,
  rating,
}) => {
  const dispatch = useDispatch();
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );

  const handleAddToCart = () => {
    console.log("clicked");
    console.log({ id, title, price, image, description, category, rating });
    dispatch(
      addToCart({
        id,
        title,
        price,
        image,
        description,
        category,
        rating,
      })
    );
    setConfirmationMessage("Product added to cart!");
    setTimeout(() => {
      setConfirmationMessage(null);
    }, 3000);
  };

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="w-auto h-auto p-4 border rounded-lg bg-white relative cursor-pointer">
      <AlertDialog>
        <AlertDialogTrigger>
          <div>
            <img
              src={image}
              alt={title}
              className="w-auto h-auto max-h-48 object-cover rounded-lg mx-auto hover:scale-105 transition duration-200 cursor-pointer"
            />
            <h2 className="text-xl font-bold mt-2">{title}</h2>
            <p className="text-gray-700">${price}</p>
            <p className="text-gray-600 mt-2">
              {truncateDescription(description, 10)}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(Math.round(rating.rate))].map((_, index) => (
                <span key={index} className="text-yellow-500">
                  &#9733;
                </span> // Star rating
              ))}
              {[...Array(5 - Math.round(rating.rate))].map((_, index) => (
                <span key={index} className="text-gray-300">
                  &#9733;
                </span> // Empty stars
              ))}
              <span className="ml-2 text-gray-500">
                ({rating.count} reviews)
              </span>
            </div>
            <button className="mt-8 px-8 py-2 rounded-md bg-orange-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-orange-500">
              Add to Cart
            </button>
            {confirmationMessage && (
              <p className="text-green-600 mt-2 font-bold">
                {confirmationMessage}
              </p>
            )}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <img
                src={image}
                alt={title}
                className="w-auto h-auto max-h-48 object-cover rounded-lg mx-auto hover:scale-105 transition duration-200 cursor-pointer"
              />
              <h1>{title}</h1>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p>{description}</p>
              <div className="flex items-center mt-2">
                {[...Array(Math.round(rating.rate))].map((_, index) => (
                  <span key={index} className="text-yellow-500">
                    &#9733;
                  </span> // Star rating
                ))}
                {[...Array(5 - Math.round(rating.rate))].map((_, index) => (
                  <span key={index} className="text-gray-300">
                    &#9733;
                  </span> // Empty stars
                ))}
                <span className="ml-2 text-gray-500">
                  ({rating.count} reviews)
                </span>
              </div>
              <p className="text-gray-700 font-bold text-2xl">${price}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-700"
            >
              Add to cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductCard;
