import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/product.models.js';
import { User } from './models/user.models.js';
import products from './data/products.js';
import { Cart } from './models/cart.models.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //create default admin user
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin',
    });

    //assign deafult user id to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //insert products into the database
    await Product.insertMany(sampleProducts);
    console.log('Product data seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error', error);
    process.exit(1);
  }
};

seedData();
