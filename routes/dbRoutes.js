const express = require("express");
const {
  addProduct,
  fetchAllProduct,
  fetchProductById,
  updateProductById,
  softDeleteById,
  hardDeleteById,
} = require("../controller/databaseController");

const DBrouter = express.Router();

DBrouter.post("/addProduct", addProduct);
DBrouter.get("/fetchAllProduct", fetchAllProduct);
DBrouter.get("/fetchProductById/:productId", fetchProductById);
DBrouter.put("/updateProductById/:productId", updateProductById);
DBrouter.delete("/softDeleteById/:productId", softDeleteById);
DBrouter.delete("/hardDeleteById/:productId", hardDeleteById);

module.exports = { DBrouter };
