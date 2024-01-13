const prisma = require("../database");

const findProducts = async () => {
    return prisma.product.findMany();
}

const findProductById = async (productId) => {
    return prisma.product.findUnique({
        where: {
            id: productId
        }
    });
}

module.exports = {
    findProducts,
    findProductById
}
