const prisma = require("../database");

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

module.exports = {
    getAllProducts
}
