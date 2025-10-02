import mongoose from "mongoose";
import dotenv from "dotenv";
import {Product} from "./models/product.models.js";
import {User} from "./models/user.models.js";
import products from "./data/products.js";
import { Cart } from "./models/cart.models.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //create default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //assign deafult user id to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {return {...product, user: userID}});

    //insert products into the database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfully");
    
    process.exit();

  } catch (error) {
    console.error("Error data succeeded successfully");;
    process.exit(1);    
  }
}

seedData();