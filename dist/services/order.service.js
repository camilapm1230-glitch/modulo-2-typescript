export function calculateOrderTotal(items) {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}
export function createOrderItem(product, quantity) {
    if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor que cero");
    }
    if (quantity > product.stock) {
        throw new Error(`Stock insuficiente para ${product.name}`);
    }
    return {
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity
    };
}
export function updateOrderStatus(order, status) {
    return {
        ...order,
        status
    };
}
