import React, { useEffect } from 'react';
import MyOrdersPage from './MyOrdersPage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-6 md:p-4">
        <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-6 space-y-0">
          {/*Left Content */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
            <button
              className="w-full bg-rabbit-red py-2 px-4 rounded-lg hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/*Right Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
