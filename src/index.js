const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {PrismaClient} = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World nodemon")
})

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products);
})

app.get("/products/:id", async (req, res) => {
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

app.post("/products", async (req, res) => {
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

app.get("/products/:id", async (req, res) => {
    const id = req.params.id; //string
    await prisma.product.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.send("product deleted")
})

app.put("/products/:id", async (req, res) => {
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
app.patch("/products/:id", async (req, res) => {
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

app.listen(PORT, () => {
    console.log("express api running in port = " + PORT)
})
