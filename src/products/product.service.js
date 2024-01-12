const prisma = require("../database");

const getAllProducts = async () => {
    return prisma.product.findMany();
}

const getProductById = async (productId) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    if (!product) {
        throw Error("product not found")
    }
    return product;
}

module.exports = {
    getAllProducts,
    getProductById
}
