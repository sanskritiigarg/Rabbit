import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineUser,
  HiUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiMiniXMark,
} from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartQuantity = cart?.products?.reduce((acc, product) => acc + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/*Logo*/}
        <div>
          <Link to="/" className="text-2xl font-semibold">
            Stitches
          </Link>
        </div>
        {/*Categories Navigation Link */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="collection/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="collection/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="collection/all?category=Top+Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            TopWear
          </Link>
          <Link
            to="collection/all?category=Bottom+Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/*Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === 'admin' && (
            <Link to={'/admin'} className="block bg-black text-white rounded-md text-sm py-1 px-2">
              Admin
            </Link>
          )}

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleCartDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartQuantity > 0 && (
              <span className="bg-stitches py-0.5 px-2 rounded-full text-white text-xs absolute -top-1">
                {cartQuantity}
              </span>
            )}
          </button>

          <Link to="/profile">
            {user ? (
              <HiUser className="h-6 w-6 text-gray-700 hover:text-black" />
            ) : (
              <HiOutlineUser className="h-6 w-6 text-gray-700 hover:text-black" />
            )}
          </Link>

          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/*Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-1/2 z-50 md:w-1/3 h-full transform transition-transform duration-300z-50 bg-white shadow-lg ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <HiMiniXMark className="h-8 w-8 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-2 text-md">
            <Link
              to="collection/all?gender=Men"
              className="block text-gray-600 hover:text-black"
              onClick={toggleNavDrawer}
            >
              MEN
            </Link>
            <Link
              to="collection/all?gender=Women"
              className="block text-gray-600 hover:text-black"
              onClick={toggleNavDrawer}
            >
              WOMEN
            </Link>
            <Link
              to="collection/all?category=Top+Wear"
              className="block text-gray-600 hover:text-black"
              onClick={toggleNavDrawer}
            >
              TOP WEAR
            </Link>
            <Link
              to="collection/all?category=Bottom+Wear"
              className="block text-gray-600 hover:text-black"
              onClick={toggleNavDrawer}
            >
              BOTTOM WEAR
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
