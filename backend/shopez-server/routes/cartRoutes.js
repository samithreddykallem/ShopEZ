const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get Cart Items
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find()
      .populate("productId");

    res.json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add To Cart
router.post("/", async (req, res) => {
  try {
    const item = await Cart.create(req.body);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;