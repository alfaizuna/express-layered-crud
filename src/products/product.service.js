const prisma = require("../database");
const {findProducts, findProductById, createNewProduct, deleteProduct, updateProduct} = require("./product.repository");

const getAllProducts = async () => {
    return findProducts();
}

const getProductById = async (productId) => {
    const product = await findProductById(productId);
    if (!product) {
        throw Error("product not found")
    }
    return product;
}

const createProduct = async (newProductData) => {
    if (!(newProductData.name
        && newProductData.description
        && newProductData.price
        && newProductData.image)
    ) {
        throw Error("some field data is missing");
    }
    return createNewProduct(newProductData);
}

const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    if (!product) {
        throw Error("product not found")
    }
    return deleteProduct(productId);
}


const updateProductByPut = async (productId, productData) => {
    if (!(productData.name
        && productData.description
        && productData.price
        && productData.image)
    ) {
        throw Error("some field data is missing");
    }
    return updateProduct(productId, productData);
}

const updateProductByPatch = async (productId, productData) => {
    return updateProduct(productId, productData);
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    updateProductByPut,
    updateProductByPatch
}
