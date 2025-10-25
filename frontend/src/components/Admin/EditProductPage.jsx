import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails } from '../../../redux/slices/productsSlice';
import { updateProduct } from '../../../redux/slices/adminProductSlice';

import ProductForm from './ProductForm';

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  const handleSubmit = (e, id, productData) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate('/admin/products');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        selectedProduct && (
          <ProductForm id={id} selectedProduct={selectedProduct} handleSubmit={handleSubmit} />
        )
      )}
    </div>
  );
};

export default EditProductPage;
