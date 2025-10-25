import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductForm = ({ id, selectedProduct, handleSubmit }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 10,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: 'Casual Wear',
    material: '',
    gender: '',
    images: [],
  });

  useEffect(() => {
    if (selectedProduct) setProductData(selectedProduct);
  }, [selectedProduct]);

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          { url: data.imageUrl, altText: prevData.name, publicId: data.publicId },
        ],
      }));
    } catch (error) {
      console.error(error);
    }

    setUploading(false);
    e.target.value = null;
  };

  const handleDeleteImage = async (indexToDelete) => {
    const imageToDelete = productData.images[indexToDelete];

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/image/delete`, {
        publicId: imageToDelete.publicId,
      });

      setProductData((prevData) => ({
        ...prevData,
        // Filter out the image at the specified index
        images: prevData.images.filter((_, index) => index !== indexToDelete),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, id ? id : null, productData)}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name || ''}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Collections */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Collection Name</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* countInStock */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-medium mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-6 flex flex-col md:flex-row w-2/3 justify-between">
          <label className="block font-medium mb-2">Gender</label>
          <div className="flex items-baseline">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-stitches border-gray-300"
              name="gender"
              value={'Men'}
              checked={productData.gender === 'Men'}
              onChange={handleChange}
            />
            <span>Men</span>
          </div>
          <div className="flex items-baseline">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-stitches border-gray-300"
              name="gender"
              value={'Women'}
              checked={productData.gender === 'Women'}
              onChange={handleChange}
            />
            <span>Women</span>
          </div>
          <div className="flex items-baseline">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-stitches border-gray-300"
              name="gender"
              value={'Unisex'}
              checked={productData.gender === 'Unisex'}
              onChange={handleChange}
            />
            <span>Unisex</span>
          </div>
        </div>

        {/* category */}
        <div className="mb-6 flex flex-col md:flex-row w-1/2 justify-between">
          <label className="block font-medium mb-2 mr-2">Category</label>
          <div className="flex items-baseline">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-stitches border-gray-300"
              name="category"
              value={'Top Wear'}
              checked={productData.category === 'Top Wear'}
              onChange={handleChange}
            />
            <span>Top Wear</span>
          </div>
          <div className="flex items-baseline">
            <input
              type="radio"
              className="mr-2 h-4 w-4 accent-stitches border-gray-300"
              name="category"
              value={'Bottom Wear'}
              checked={productData.category === 'Bottom Wear'}
              onChange={handleChange}
            />
            <span>Bottom Wear</span>
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={Array.isArray(productData.sizes) ? productData.sizes.join(', ') : ''}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(',').map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={Array.isArray(productData.colors) ? productData.colors.join(', ') : ''}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(',').map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-400 rounded-md p-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-red-500 file:text-white hover:file:bg-red-600 file:cursor-pointer cursor-pointer"
          />
          {uploading && <p>Uploading image...</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={image.altText || 'Product Image'}
                  className="w-20 h-20 object-cover rounded-md"
                />
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -mt-1 -mr-1 hover:bg-red-700 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
