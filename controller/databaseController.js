const Product = require("../model/product");

//Add a new product
async function addProduct(req, res) {
  try {
    const newProduct = req.body;
    const Prod = new Product(newProduct);
    await Prod.save();
    res.send("product added successfully..");
  } catch (err) {
    res.status(500).send("error while adding product !!");
  }
}

//fetch all product
async function fetchAllProduct(req, res) {
  try {
    const allProduct = await Product.find();
    res.send(allProduct);
  } catch (err) {
    res.status(500).send("error while fetching product !!");
  }
}

//fetch product by id
async function fetchProductById(req, res) {
  try {
    const { productId } = req.params;
    const allProduct = await Product.find({ _id: productId });
    res.send(allProduct);
  } catch (err) {
    res.status(500).send("error while fetching product !!");
  }
}

//update product by id
async function updateProductById(req, res) {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    await Product.findByIdAndUpdate({ _id: productId }, updatedProduct);
    res.send("product updated successfully...");
  } catch (err) {
    res.status(500).send("error while updating product !!");
  }
}

//soft delete product by id
async function softDeleteById(req, res) {
  try {
    const { productId } = req.params;
    await Product.findByIdAndUpdate({ _id: productId }, { softDelete: true });
    res.send("product deleted successfully...");
  } catch (err) {
    res.status(500).send("error while updating product !!");
  }
}

//hard delete product by id
async function hardDeleteById(req, res) {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete({ _id: productId });
    res.send("product deleted successfully...");
  } catch (err) {
    res.status(500).send("error while updating product !!");
  }
}

module.exports = {
  addProduct,
  fetchAllProduct,
  fetchProductById,
  updateProductById,
  softDeleteById,
  hardDeleteById,
};
