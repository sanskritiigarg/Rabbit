import { Order } from '../models/order.models.js';

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order Not Found' });

    order.status = req.body.status || order.status;
    order.isDelivered = req.body.status === 'Delivered' ? true : order.isDelivered;
    order.deliveredAt = req.body.status === 'Delivered' ? Date.now() : order.deliveredAt;

    await order.save();
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order Not Found' });

    await order.deleteOne();
    res.json({ message: 'Order removerd' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getOrders, updateOrderStatus, deleteOrder };
