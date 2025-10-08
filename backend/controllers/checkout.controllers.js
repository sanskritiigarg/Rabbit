import {Checkout} from "../models/checkout.models.js";
import {Order} from "../models/order.models.js";
import {Cart} from "../models/cart.models.js";

const createCheckoutSession = async (req, res) => {
  const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body;
    
  if (!checkoutItems && checkoutItems.length == 0) {
    return res.status(400).json({message: "No items in Checkout"});
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    })
    console.log(`Checkout created for user ${req.user._id}`);
    res.status(201).json(newCheckout);

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }
}

const updatePayment = async (req, res) => {
  try {
    const {paymentStatus, paymentDetails} = req.body;

    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) return res.status(404).json({message: "Checkout Not Found"});

    if (paymentStatus === "Paid") {
      checkout.paymentStatus = paymentStatus;
      checkout.isPaid = true;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({message: "Invalid Payment Status"});
    }

  } catch (error) {
    console.log(error);    
    res.status(500).json({message: "Server Error"});
  }
}

const finalizeCheckout = async (req,res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) return res.status(404).json({message: "Checkout Not Found"});

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        paymentStatus: checkout.paymentStatus,
        paymentDetails: checkout.paymentDetails
      });

      checkout.isFinalized = true;
      checkout.FinalizedAt = Date.now();
      await checkout.save();

      Cart.findByIdAndDelete({user: checkout.user});
      res.status(201).json(finalOrder);

    } else if (checkout.isFinalized) {
      res.status(400).json({message: "Checkout is already finalized"});

    } else {
      res.status(400).json({message: "Checkout is not paid"});
    }

  } catch (error) {
    console.log(error);    
    res.status(500).json({message: "Server Error"});
  }
}

export {createCheckoutSession,
  updatePayment,
  finalizeCheckout
};