import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: '',
    color: '',
    gender: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ['Top Wear', 'Bottom Wear'];
  const colors = ['Red', 'Blue', 'Black', 'Green', 'Yellow', 'White', 'Pink', 'Beige', 'Navy'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['Cotton', 'Wool', 'Linen', 'Denim', 'Polyester', 'Silk', 'Viscose', 'Fleece'];
  const brands = [
    'Urban Threads',
    'Modern Fit',
    'Street Style',
    'Beach Breeze',
    'Fashionista',
    'ChicStyle',
  ];
  const genders = ['Male', 'Female'];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    console.log(params);

    setFilters({
      category: params.category || '',
      color: params.color || '',
      gender: params.gender || '',
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });

    setPriceRange([params.minPrice || 0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === 'checkbox') {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(','));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>

      {/*Category filters*/}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-0.5">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-rabbit-red border-gray-300"
              checked={filters.category == category}
              name="category"
              onChange={handleFilterChange}
              value={category}
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/*Gender filters*/}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-0.5">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-rabbit-red border-gray-300"
              name="gender"
              value={gender}
              checked={filters.gender == gender}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/*Colors */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              name="color"
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color == color ? 'ring-1 ring-gray-600' : ''}`}
              key={color}
              style={{ backgroundColor: color.toLowerCase() }}
              value={color}
              onClick={handleFilterChange}
            ></button>
          ))}
        </div>
      </div>

      {/*Sizes */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Sizes</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-0.5">
            <input
              type="checkbox"
              name="size"
              className="mr-2 h-4 w-4 accent-rabbit-red border-gray-300"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/*Materials */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Materials</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-0.5">
            <input
              type="checkbox"
              name="material"
              className="mr-2 h-4 w-4 accent-rabbit-red border-gray-300"
              checked={filters.material.includes(material)}
              value={material}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/*Brands */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-0.5">
            <input
              type="checkbox"
              name="brand"
              className="mr-2 h-4 w-4 accent-rabbit-red border-gray-300"
              checked={filters.brand.includes(brand)}
              value={brand}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/*PriceRange */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-rabbit-red"
          value={priceRange[1]}
          onChange={handlePriceChange}
        />

        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
