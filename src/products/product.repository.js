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

const createNewProduct = async (newProductData) => {
    return prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image
        }
    });
}

const deleteProduct = async (productId) => {
    return prisma.product.delete({
        where: {
            id: productId
        }
    });
}

module.exports = {
    findProducts,
    findProductById,
    createNewProduct,
    deleteProduct
}
