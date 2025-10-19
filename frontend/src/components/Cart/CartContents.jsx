import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity } from '../../../redux/slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleQuantityUpdate = (delta, productId, size, color, quantity) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        }),
      );
    }
  };

  const deleteItem = (productId, size, color, quantity) => {
    dispatch(removeFromCart({ productId, size, color, quantity, userId, guestId }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            <Link to={`products/${product.productId}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-24 w-20 object-cover mr-3 rounded"
              />
            </Link>
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-600">
                {product.size} | {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="border rounded px-1.5 py-0.5 text-xl font-medium"
                  onClick={() =>
                    handleQuantityUpdate(
                      -1,
                      product.productId,
                      product.size,
                      product.color,
                      product.quantity,
                    )
                  }
                >
                  -
                </button>
                <span className="mx-3">{product.quantity}</span>
                <button
                  className="border rounded px-1.5 py-0.5 text-xl font-medium"
                  onClick={() =>
                    handleQuantityUpdate(
                      1,
                      product.productId,
                      product.size,
                      product.color,
                      product.quantity,
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <p>${product.price}</p>
            <button
              onClick={() =>
                deleteItem(product.productId, product.size, product.color, product.quantity)
              }
            >
              <RiDeleteBin3Line className="h-5 w-5 mt-1 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
