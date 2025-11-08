import { Product } from '../models/product.models.js';

const getProductsByCategory = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== 'all') {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== 'all') {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(',') };
    }

    if (brand) {
      query.brand = { $in: brand.split(',') };
    }

    if (size) {
      query.sizes = { $in: size.split(',') };
    }

    if (color) {
      query.colors = { $in: color.split(',') };
    }

    if (gender) {
      query.gender = gender;
    }

    const conditions = [];

    if (minPrice || maxPrice) {
      const priceCondition = {};
      if (minPrice) priceCondition.$gte = Number(minPrice);
      if (maxPrice) priceCondition.$lte = Number(maxPrice);

      conditions.push({
        $or: [{ price: priceCondition }, { discountPrice: priceCondition }],
      });
    }

    if (search) {
      conditions.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      });
    }

    if (conditions.length > 0) {
      query.$and = conditions;
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          sort = { price: 1 };
          break;
        case 'priceDesc':
          sort = { price: -1 };
          break;
        case 'popularity':
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Product Not found' });

    const similarProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
      gender: product.gender,
    }).limit(3);

    res.json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getBestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: 'No best seller product found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(8);

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'No new Arrivals' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addUserReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    const { rating, comment } = req.body;
    product.reviews.push({ rating, comment, user: req.user._id, name: req.user.name });

    const currRating = product.rating || 0;
    const currNumRatings = product.numRatings || 0;
    const newRating = (currRating * currNumRatings + rating) / (currNumRatings + 1);
    product.rating = newRating;
    product.numRatings += 1;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    const index = product.reviews.findIndex((review) => review._id.toString() === reviewId);

    if (index === -1) return res.status(404).json({ message: 'Review Not Found' });

    if (product.reviews[index].user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this review' });
    }

    if (comment) {
      product.reviews[index].comment = comment;
    }

    if (rating) {
      const currProdRating = product.reviews[index].rating;
      product.reviews[index].rating = rating;
      product.rating =
        (product.rating * product.numRatings - currProdRating + rating) / product.numRatings;
    }

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const deleteUserReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const reviewId = req.params.reviewId;

    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    const index = product.reviews.findIndex((review) => review._id.toString() === reviewId);

    if (index === -1) return res.status(404).json({ message: 'Review Not Found' });

    if (product.reviews[index].user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this review' });
    }

    const ProdRating = product.reviews[index].rating;
    product.rating = (product.rating * product.numRatings - ProdRating) / (product.numRatings - 1);
    product.numRatings -= 1;
    product.reviews = product.reviews.filter((review) => review._id.toString() !== reviewId);

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export {
  getProductsByCategory,
  getProductByID,
  getSimilarProducts,
  getBestSeller,
  getNewArrivals,
  addUserReview,
  updateUserReview,
  deleteUserReview,
};
