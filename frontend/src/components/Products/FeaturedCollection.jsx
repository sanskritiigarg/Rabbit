import React from 'react';
import { Link } from 'react-router-dom';
import featuredCollection from '../../assets/featured-collection.jpg';

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-3xl">
        {/*Left Content */}
        <div className="lg:w-1/2 p-6 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Comfort & Style</h2>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Apparel for Everyday Life</h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high quality, comfortable clothes that effortlessly blend fashion and function.
            Designed to make you look great everyday.
          </p>
          <Link
            to="collection/all"
            className="bg-black text-white px-4 py-2 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>

        {/*Right side */}
        <div className="w-1/2">
          <img
            src={featuredCollection}
            alt="Featured Collection"
            className="w-full h-[550px] object-cover rounded-tr-3xl rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
