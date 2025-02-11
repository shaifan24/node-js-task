const express = require("express");
const { connectDB } = require("./config/database");
const { DBrouter } = require("./routes/dbRoutes");
const { authRouter } = require("./routes/authRoutes");
const { otpRouter } = require("./routes/otpRoutes");
const { userRouter } = require("./routes/userRoutes");
const path = require("path");
require("dotenv").config();
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 2222;

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ "uploads" folder created.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", DBrouter);
app.use("/", authRouter);
app.use("/", otpRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("DB connected succesfully.....");
    app.listen(PORT, () => {
      console.log("server running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Error occur while connectting Database", err);
  });
