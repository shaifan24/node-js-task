const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Product = require("../Node-js-task/model/product"); // Replace with the correct path to your product model

// MongoDB connection
mongoose.connect(
  "mongodb+srv://shaifanshaikh:yXvvjzPu8fgRixIh@testcluster.ymff1.mongodb.net/product-db"
);

const generateProducts = async () => {
  try {
    const sampleProducts = [];
    for (let i = 0; i < 100; i++) {
      sampleProducts.push({
        productName: faker.commerce.productName(),
        category: faker.commerce.department(),
        qty: faker.number.int({ min: 1, max: 100 }), // Corrected method
        price: parseFloat(faker.commerce.price()),
        softDelete: faker.datatype.boolean(),
      });
    }

    await Product.insertMany(sampleProducts);
    console.log("100 sample products have been added to the database.");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error generating products:", error);
    mongoose.disconnect();
  }
};

generateProducts();
