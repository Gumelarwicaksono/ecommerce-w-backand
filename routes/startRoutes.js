import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/usersModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createProducts = await Product.insertMany(data.products);
  const createUsers = await User.insertMany(data.users);
  res.send({ createProducts, createUsers });
});

export default router;
