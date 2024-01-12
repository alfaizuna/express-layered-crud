const express = require('express');
const router = express.Router();
const prisma = require("../database");
const {getAllProducts} = require("../products/product.service");

router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
})

router.get("/:id", async (req, res) => {
    const productId = req.params.id; //string
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(productId)
        }
    });
    if (!product) {
        return res.status(404).send("product not found!");
    }
    res.send(product);
})

router.post("/", async (req, res) => {
    const newProduct = req.body;
    const products = await prisma.product.create({
        data: {
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            image: newProduct.image
        }
    });
    res.status(201).send({
        body: products,
        message: "create new product success"
    });
})

router.get("/:id", async (req, res) => {
    const id = req.params.id; //string
    await prisma.product.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.send("product deleted")
})

router.put("/:id", async (req, res) => {
    const id = req.params.id; //string
    const productData = req.body;

    if (!(productData.name && productData.description && productData.price && productData.image)) {
        return res.status(400).send("some field data is missing");
    }

    const product = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    });

    res.send({
        body: product,
        message: "product has been updated"
    });
})
router.patch("/:id", async (req, res) => {
    const id = req.params.id; //string
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    });

    res.send({
        body: product,
        message: "product has been updated"
    });
})

module.exports = router;
