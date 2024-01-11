const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.get("/api", (req, res)=>{
    res.send("Hello World nodemon")
})

app.get("/products", async (req, res)=>{
    const products = await prisma.product.findMany();
    res.send(products);
})

app.listen(PORT, ()=>{
    console.log("express api running in port = " + PORT)
})
