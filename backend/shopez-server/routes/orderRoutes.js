const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

/*
CREATE ORDER (CHECKOUT)
*/

router.post("/checkout", async (req, res) => {
  try {
    const { userId } = req.body;

    const cartItems = await Cart.find({
      userId,
    }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const products = cartItems.map(
      (item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })
    );

    const totalAmount = cartItems.reduce(
      (sum, item) =>
        sum +
        item.productId.price *
          item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      products,
      totalAmount,
    });

    // Clear cart after checkout
    await Cart.deleteMany({
      userId,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
GET USER ORDERS
*/

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;