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

const createProduct = async (newProductData) => {
    return prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image
        }
    });
}

module.exports = {
    findProducts,
    findProductById,
    createProduct
}
