const express = require("express");
const dotenv = require("dotenv");
//const connectDB = require("./config/db");

dotenv.config();
//connectDB();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running");
});

app.use("/api/products", productRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});