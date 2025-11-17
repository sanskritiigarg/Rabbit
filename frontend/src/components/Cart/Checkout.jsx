import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PaymentBtn from './PaymentBtn';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  // Ensure cart is loaded
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=checkout');
    }
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: 'PayPal',
          totalPrice: cart.totalPrice,
        }),
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: 'Paid', paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        },
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        },
      );

      navigate('/order-confirmation');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Cart is loading...</p>;
  }

  if (error) {
    if (!cart || !cart.products) {
      return <p>Cart is empty.</p>;
    }
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto tracking-tight">
      {/*Left section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="mb-4 text-2xl font-bold">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-2 font-medium">Contact Details</h3>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              disabled
              className="p-2 border border-gray-300 bg-gray-100 text-gray-500 w-full rounded"
              value={user ? user.email : ''}
            />
          </div>
          <h3 className="text-lg mb-2 font-semibold">Delivery Address</h3>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                required
                value={shippingAddress.firstName}
                onChange={(e) => {
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                required
                value={shippingAddress.lastName}
                onChange={(e) => {
                  setShippingAddress({ ...shippingAddress, lastName: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              required
              value={shippingAddress.address}
              onChange={(e) => {
                setShippingAddress({ ...shippingAddress, address: e.target.value });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block mb-1">City</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                required
                value={shippingAddress.city}
                onChange={(e) => {
                  setShippingAddress({ ...shippingAddress, city: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block mb-1">Postal Code</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                required
                value={shippingAddress.postalCode}
                onChange={(e) => {
                  setShippingAddress({ ...shippingAddress, postalCode: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Country</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              required
              value={shippingAddress.country}
              onChange={(e) => {
                setShippingAddress({ ...shippingAddress, country: e.target.value });
              }}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              required
              value={shippingAddress.phone}
              onChange={(e) => {
                setShippingAddress({ ...shippingAddress, phone: e.target.value });
              }}
            />
          </div>

          <div className="mt-5">
            {!checkoutId ? (
              <button className="bg-black w-full text-white py-3 px-1 rounded hover:bg-gray-800 mt-3">
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PaymentBtn
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert('Payment failed. Try again.')}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t mb-4">
          {cart.products.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-4 border-b">
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div className="">
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                </div>
              </div>
              <p className="text-lg">${(product.price * product.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 pt-4 border-t">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
