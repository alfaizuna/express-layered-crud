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
    getAllProducts,
    getProductById,
    createProduct
}
