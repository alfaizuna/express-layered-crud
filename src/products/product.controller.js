const express = require('express');
const router = express.Router();
const prisma = require("../database");
const {
    getAllProducts,
    getProductById,
    deleteProductById,
    createProduct, updateProductByPut
} = require("./product.service");

router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(productId);
        res.send(product);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;
        const product = await createProduct(newProductData);
        res.status(201).send({
            body: product,
            message: "create new product success"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteProductById(id);
        res.send("product deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;
        const product = await updateProductByPut(parseInt(id), productData);
        res.send({
            body: product,
            message: "product has been updated"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;
        const product = await updateProductByPut(parseInt(id), productData);
        res.send({
            body: product,
            message: "product has been updated"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;
