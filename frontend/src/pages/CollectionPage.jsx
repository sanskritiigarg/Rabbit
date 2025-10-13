import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isFilterbarOpen, setIsFilterbarOpen] = useState(false);
  const [isSortbarOpen, setIsSortbarOpen] = useState(false);
  const filterbarRef = useRef(null);
  const filterBtnRef = useRef(null);
  const sortbarRef = useRef(null);
  const sortBtnRef = useRef(null);

  const toggleFilterbar = (e) => {
    e.stopPropagation();
    setIsFilterbarOpen(!isFilterbarOpen);
  };

  const toggleSortbar = (e) => {
    e.stopPropagation();
    setIsSortbarOpen(!isSortbarOpen);
  };

  const handleOutsideClick = (e) => {
    // close the filter sidebar if clicked outside the sidebar
    if (
      filterbarRef.current &&
      !filterbarRef.current.contains(e.target) &&
      filterBtnRef.current &&
      !filterBtnRef.current.contains(e.target)
    ) {
      setIsFilterbarOpen(false);
    }

    if (
      sortbarRef.current &&
      !sortbarRef.current.contains(e.target) &&
      sortBtnRef.current &&
      !sortBtnRef.current.contains(e.target)
    ) {
      setIsSortbarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isFilterbarOpen]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=7', altText: 'Stylish Top' }],
        },
        {
          _id: 2,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=6', altText: 'Stylish Top' }],
        },
        {
          _id: 3,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=8', altText: 'Stylish Top' }],
        },
        {
          _id: 4,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=9', altText: 'Stylish Top' }],
        },
        {
          _id: 1,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=7', altText: 'Stylish Top' }],
        },
        {
          _id: 2,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=6', altText: 'Stylish Top' }],
        },
        {
          _id: 3,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=8', altText: 'Stylish Top' }],
        },
        {
          _id: 4,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=9', altText: 'Stylish Top' }],
        },
        {
          _id: 1,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=7', altText: 'Stylish Top' }],
        },
        {
          _id: 2,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=6', altText: 'Stylish Top' }],
        },
        {
          _id: 3,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=8', altText: 'Stylish Top' }],
        },
        {
          _id: 4,
          name: 'Stylish Top',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=9', altText: 'Stylish Top' }],
        },
      ];

      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/*Mobile filter button */}
      <div className="grid grid-cols-2">
        <button
          ref={filterBtnRef}
          onClick={toggleFilterbar}
          className="lg:hidden border p-2 flex justify-center items-center"
        >
          <FaFilter className="mr-2" />
          Filters
        </button>

        <button
          ref={sortBtnRef}
          onClick={toggleSortbar}
          className="lg:hidden border p-2 flex justify-center items-center"
        >
          <FaFilter className="mr-2" />
          Sort
        </button>
      </div>

      {/*Filter sidebar */}
      <div
        ref={filterbarRef}
        className={`${isFilterbarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 bg-white z-50 w-xs overflow-y-auto transition-transform duration-200 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/*Sort sidebar */}
      <div
        ref={sortbarRef}
        className={`${isSortbarOpen ? 'translate-y-0' : 'translate-y-full'} bottom-0 left-0 right-0 fixed w-full bg-white z-100 h-xl transition-transform duration-200`}
      >
        <SortOptions />
      </div>

      {isFilterbarOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 md:hidden" onClick={toggleFilterbar}></div>
      )}

      {isSortbarOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 md:hidden" onClick={toggleSortbar}></div>
      )}

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 px-4">All Collection</h2>
        <div className="hidden lg:block">
          <SortOptions />
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
