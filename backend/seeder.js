import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Order from "./models/OrderModel.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    console.log(sampleProducts);

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(createdProducts);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
