export function findProductById(products, id) {
    return products.find((product) => product.id === id);
}
export function updateStock(product, quantity) {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }
    if (quantity > product.stock) {
        throw new Error("Insufficient stock");
    }
    const newStock = product.stock - quantity;
    return {
        ...product,
        stock: newStock,
        available: newStock > 0
    };
}
export function getAvailableProducts(products) {
    return products.filter((product) => product.available);
}
export function searchProducts(products, term) {
    const normalizedTerm = term.toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(normalizedTerm));
}
export function getCatalogResponse(products) {
    return {
        success: true,
        message: "Catálogo obtenido correctamente",
        data: products
    };
}
