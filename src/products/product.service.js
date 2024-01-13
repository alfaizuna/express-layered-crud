const prisma = require("../database");
const {findProducts} = require("./product.repository");

const getAllProducts = async () => {
    return findProducts;
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

const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    if (product) {
        return prisma.product.delete({
            where: {
                id: productId
            }
        });
    }
}


const updateProductByPut = async (productId, productData) => {
    if (!(productData.name
        && productData.description
        && productData.price
        && productData.image)
    ) {
        throw Error("some field data is missing");
    }

    const product = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    });
    return product;
}

const updateProductByPatch = async (productId, productData) => {
    const product = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    });
    return product;
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    updateProductByPut,
    updateProductByPatch
}
