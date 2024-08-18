import React from "react";
import { CartItem as CartItemType } from "../slices/cartslice";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../slices/cartslice";
import { FaTrash } from "react-icons/fa";
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

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex gap-12 max-w-[70%]">
        <img
          src={item.image}
          alt={item.title}
          className=" max-h-28  rounded-lg  cursor-pointer"
        />
        <div className=" ">
          <h2 className="text-lg font-bold">{item.title}</h2>
          <p>{item.description.slice(0, 100)}...</p>
          <p className="text-gray-700 font-bold text-2xl mt-4 ">
            ${item.price}
          </p>
        </div>
      </div>

      <div className="flex items-center mt-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="px-2 py-1 bg-gray-300 text-gray-700 hover:text-white hover:bg-orange-600 rounded-l transition duration-200"
        >
          -
        </button>
        <span className="px-4 py-1 bg-gray-200 text-gray-700">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="px-2 py-1 bg-gray-300 text-gray-700 hover:text-white hover:bg-orange-600 rounded-r transition duration-200"
        >
          +
        </button>
      </div>

      <AlertDialog>
        <AlertDialogTrigger>
          <FaTrash
            size={20}
            className="text-red-500 cursor-pointer hover:scale-125 transition duration-200"
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveFromCart}
              className="bg-orange-500 hover:bg-orange-800"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartItem;
