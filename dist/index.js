import { PaymentMethod } from "./models/order.js";
import { findProductById, getAvailableProducts, getCatalogResponse, searchProducts, updateStock } from "./services/product.service.js";
import { calculateOrderTotal, createOrderItem, updateOrderStatus } from "./services/order.service.js";
function describeIdentifier(id) {
    if (typeof id === "number") {
        return `ID numérico: ${id}`;
    }
    return `ID textual: ${id.toUpperCase()}`;
}
const products = [
    { id: 1, name: "Laptop", price: 2800000, stock: 5, available: true },
    { id: 2, name: "Monitor", price: 850000, stock: 8, available: true },
    { id: 3, name: "Mouse", price: 80000, stock: 20, available: true }
];
const customer = {
    id: 1,
    name: "Carlos Martínez",
    email: "carlos@example.com"
};
const laptop = findProductById(products, 1);
const mouse = findProductById(products, 3);
if (!laptop || !mouse) {
    throw new Error("No fue posible construir el pedido");
}
const items = [
    createOrderItem(laptop, 1),
    createOrderItem(mouse, 2)
];
const order = {
    id: 1,
    customer,
    items,
    status: "pending",
    paymentMethod: PaymentMethod.CARD,
    total: calculateOrderTotal(items)
};
const response = {
    success: true,
    message: "Pedido creado correctamente",
    data: order
};
console.dir(response, { depth: null });
console.log("Stock laptop luego de vender 1 unidad:", updateStock(laptop, 1).stock);
console.log("Productos disponibles:", getAvailableProducts(products));
console.log("Búsqueda 'lap':", searchProducts(products, "lap"));
console.log("Búsqueda 'MOUSE':", searchProducts(products, "MOUSE"));
const paidOrder = updateOrderStatus(order, "paid");
console.log("Estado original:", order.status);
console.log("Estado actualizado:", paidOrder.status);
console.dir(getCatalogResponse(products), { depth: null });
console.log(describeIdentifier(10));
console.log(describeIdentifier("pedido-1"));
