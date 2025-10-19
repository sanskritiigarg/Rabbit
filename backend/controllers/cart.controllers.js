import { Cart } from '../models/cart.models.js';
import { Product } from '../models/product.models.js';

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

const addCartItem = async (req, res) => {
  const { productId, quantity, color, size, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'product Not Found' });

    let cart = await getCart(userId, guestId);

    if (cart) {
      // check if product exists in cart
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId && p.size == size && p.color == color,
      );

      // if exists, increment quantity
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.discountPrice ? product.discountPrice : product.price,
          size,
          color,
          quantity,
        });
      }
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create new cart for guest or user
      const newCart = await Cart.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : 'guest_' + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.discountPrice ? product.discountPrice : product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: (product.discountPrice ? product.discountPrice : product.price) * quantity,
      });

      res.status(201).json(newCart);
    }
  } catch (error) {
    console.error('Server Error');
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, userId, guestId, quantity, color, size } = req.body;

    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: 'Cart Not found' });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color,
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove item from cart
      }

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { productId, userId, guestId, size, color } = req.body;

    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: 'Cart Not found' });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color,
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

      cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'product Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserCart = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const mergeCart = async (req, res) => {
  const { guestId } = req.body;

  try {
    const userCart = await Cart.findOne(req.user._id);
    const guestCart = await Cart.findOne({ guestId });

    if (guestCart) {
      if (guestCart.length === 0) {
        return res.status(400).json({ message: 'Guest cart is empty' });
      }

      if (userCart) {
        //merge into user cart
        guestCart.products.forEach((item) => {
          const userCartIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === item.productId.toString() &&
              p.size === item.size &&
              p.color === item.color,
          );

          if (userCartIndex > -1) {
            userCart.products[userCartIndex].quantity += item.quantity;
          } else {
            userCart.products.push(item);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );

        userCart.save();
        res.status(200).json(userCart);
      } else {
        // if no existing user cart, guest cart becomes user cart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: 'Guest Cart not found' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Server Error' });
  }
};

export { addCartItem, updateCartItem, deleteCartItem, getUserCart, mergeCart };
