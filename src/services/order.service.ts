import type { Product } from "../models/product.js";
import type {
  Order,
  OrderItem,
  OrderStatus
} from "../models/order.js";
export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
}
export function createOrderItem(
  product: Product,
  quantity: number
): OrderItem {
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
export function updateOrderStatus(
  order: Order,
  status: OrderStatus
): Order {
  return {
    ...order,
    status
  };
}