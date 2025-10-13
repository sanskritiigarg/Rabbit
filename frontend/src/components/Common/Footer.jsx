import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-4">
        <div>
          <h3 className="text-lg text-gray-800 mb-5">Newsletter</h3>
          <p className="text-gray-500 text-md">
            Be the first to hear about our new products, online offers and exclusive events.
          </p>
          <p className="text-gray-500 text-sm font-medium mb-5">
            Sign up and get 10% off on first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className=" p-3 w-full text-sm border-t border-b border-l focus:outline-none focus:ring-1 focus:ring-gray-500  rounded-l-md transition-all"
              required
            />
            <button
              className="bg-black text-white px-4 py-3 text-sm rounded-r
           -md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/*Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's bottom wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/*Follow us*/}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500">Call us</p>
          <p className="mt-2">
            <FiPhoneCall className="inline-block mr-2" />
            +1-(234)-5678
          </p>
        </div>
      </div>

      {/*Footer bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          &copy; 2025, Sanskriti. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
