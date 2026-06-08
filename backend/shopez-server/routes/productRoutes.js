const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/*
GET ALL PRODUCTS
*/

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
ADD PRODUCT
*/

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(
      req.body
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
DELETE PRODUCT
*/

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
	router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;