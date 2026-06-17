const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

/*
GET CART ITEMS
*/

router.get("/", async (req, res) => {
  try {
    const items = await Cart.find()
      .populate("productId");

    res.json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
ADD TO CART
*/

router.post("/", async (req, res) => {
  try {
    const item = await Cart.create(req.body);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
UPDATE QUANTITY
*/

router.put("/:id", async (req, res) => {
  try {
    const item =
      await Cart.findByIdAndUpdate(
        req.params.id,
        {
          quantity: req.body.quantity,
        },
        { new: true }
      );

    res.json(item);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
REMOVE ITEM
*/

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;