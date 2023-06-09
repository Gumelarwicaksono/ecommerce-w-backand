import express, { query } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// ===========================
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

// =============
// default 1 page
let PAGE_SIZE = 3;
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    // ====== categori ========
    const categoryFilter =
      category && category !== 'all'
        ? {
            category,
          }
        : {};
    // ====== rating  ========
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    // ====== price  ========
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    //
    const sortOrder = order === 'featured' ? { featured: -1 } : order === 'lowest' ? { price: 1 } : order === 'highest' ? { price: -1 } : order === 'toprated' ? { rating: -1 } : order === 'newest' ? { createdAt: -1 } : { _id: -1 };
    // ================
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    // ===================
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

// =============
productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
// ================ show : id =======================================================
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
// ============= create ==========================================================
productRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = new Product(req.body);
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
);

//========== update =============================================================
productRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
);

// ================ deleted =======================================================

productRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

export default productRouter;
