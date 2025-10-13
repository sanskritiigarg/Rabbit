import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout');
    toggleCartDrawer();
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white w-3/4 sm:w-1/2 md:w-1/3 shadow-lg transform duration-300 transition-transform flex flex-col z-50 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Cart content with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        <CartContents />
      </div>

      {/*Checkout button */}
      <div className="bg-white p-4 sticky bottom-0">
        <button
          onClick={handleCheckout}
          className="w-full hover:bg-gray-800 bg-black transform text-white py-2 text-lg font-semibold rounded-sm"
        >
          Checkout
        </button>
        <p className="text-xs text-gray-500 text-center mt-1 tracking-tighter">
          Shipping, taxes and discount codes calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
