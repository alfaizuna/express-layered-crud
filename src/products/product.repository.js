const prisma = require("../database");

const findProducts = async () => {
    return prisma.product.findMany();
}

module.exports = {
    findProducts
}
