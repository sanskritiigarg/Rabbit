import { useDispatch } from 'react-redux';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router';
import { createProduct } from '../../../redux/slices/adminProductSlice';

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e, id, productData) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    navigate('/admin/products');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>
      <ProductForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddProductPage;
