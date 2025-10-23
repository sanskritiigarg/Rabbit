import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

connectdb();

app.get('/', (req, res) => {
  res.send('WELCOME TO RABBIT API!');
});

//API ROUTES
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';
import adminUserRoutes from './routes/adminUser.routes.js';
import adminProductRoutes from './routes/adminProducts.routes.js';
import adminOrderRoutes from './routes/adminOrder.routes.js';

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/image', uploadRoutes);
app.use('/api', subscriberRoutes);

// Admin Routes
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
