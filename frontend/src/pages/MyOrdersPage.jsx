import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchUserOrders } from '../../redux/slices/orderSlice';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (id) => {
    navigate(`/order/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-xl font-bold mb-4">My Orders</h2>
      <div className="shadow sm:rounded-lg overflow-x-auto">
        <table className=" relative min-w-full text-left text-gray-500">
          <thead className="bg-gray-50 text-sm uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">OrderId</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:border-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(order._id)}
                >
                  <td className="py-2 px-4 sm:py-3 sm:px-4">
                    <img
                      src={order.orderItems[0]?.image}
                      alt={order.orderItems[0]?.name}
                      className="h-10 w-10 sm:w-12 sm:h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 sm:py-3 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order.id}
                  </td>
                  <td className="py-2 px-4 sm:py-3 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4 sm:py-3 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-4 sm:py-3 sm:px-4">{order.orderItems.length}</td>
                  <td className="py-2 px-4 sm:py-3 sm:px-4">${order.totalPrice}</td>
                  <td
                    className={`px-2 py-1 text-sm sm:text-md text-center font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-6 text-center">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
