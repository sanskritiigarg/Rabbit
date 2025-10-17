import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import productReducer from './slices/productsSlice.js';
import cartReducer from './slices/cartSlice.js';
import checkoutReducer from './slices/checkoutSlice.js';
import orderReducer from './slices/orderSlice.js';
import adminUserReducer from './slices/adminUserSlice.js';
import adminProductReducer from './slices/adminProductSlice.js';
import adminOrderReducer from './slices/adminOrderSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    adminUser: adminUserReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
  },
});

export default store;
