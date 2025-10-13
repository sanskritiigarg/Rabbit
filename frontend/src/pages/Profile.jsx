import React from 'react';
import MyOrdersPage from './MyOrdersPage';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-6 md:p-4">
        <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-6 space-y-0">
          {/*Left Content */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">John Doe</h1>
            <p className="text-lg text-gray-600 mb-4">john@example.com</p>
            <button className="w-full bg-rabbit-red py-2 px-4 rounded-lg hover:bg-red-600 text-white">
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
