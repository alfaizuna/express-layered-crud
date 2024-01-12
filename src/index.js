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

app.listen(PORT, () => {
    console.log("express api running in port = " + PORT)
})
