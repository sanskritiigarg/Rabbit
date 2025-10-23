import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../../redux/slices/productsSlice';
import { updateProduct } from '../../../redux/slices/adminProductSlice';
import axios from 'axios';

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: '',
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate('/admin/products');
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
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
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
              value={productData.countInStock || 10}
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
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProductPage;
