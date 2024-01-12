const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const productController = require("./products/product.controller");
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World nodemon")
})

app.use("/products", productController);

app.listen(PORT, () => {
    console.log("express api running in port = " + PORT)
})
