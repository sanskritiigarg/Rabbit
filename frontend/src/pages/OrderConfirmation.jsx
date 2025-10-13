import React from 'react';
import { Link } from 'react-router';

const checkout = {
  _id: '123123',
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: '1',
      name: 'T-shirt',
      size: 'M',
      color: 'Red',
      quantity: 1,
      price: 15,
      image: 'https://picsum.photos/600random=1',
    },
    {
      productId: '2',
      name: 'Jeans',
      size: 'M',
      color: 'Blue',
      quantity: 1,
      price: 25,
      image: 'https://picsum.photos/200random=2',
    },
  ],
  shippingAddress: {
    address: '123 Fashion Street',
    city: 'New York',
    country: 'USA',
  },
};

const OrderConfirmation = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-3">
        Thank you for your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-semibold">Order Id: {checkout._id}</h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Payment info */}
            <div>
              <h4
                className="text-lg
              font-semibold mb-2"
              >
                Payment
              </h4>
              <p className="text-gray-600">Razorpay</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">{checkout.shippingAddress.address}</p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{checkout.shippingAddress.country}{' '}
              </p>
            </div>
          </div>

          <p>
            <Link to={'/my-orders'} className=" text-blue-600 hover:underline">
              Go to all orders
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
