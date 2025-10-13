import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm);

    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'}`}
    >
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 text-gray-600 transform -translate-1/2  hover:text-black"
            >
              <HiMagnifyingGlass className="h-6 w-6 " />
            </button>
          </div>
          <button
            className="absolute right-2 -top-2 text-gray-600 transform -translate-1/2  hover:text-black
            "
            onClick={handleSearchToggle}
          >
            <HiMiniXMark className="h-7 w-7" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
