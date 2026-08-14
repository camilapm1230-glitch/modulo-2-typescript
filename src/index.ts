type ProductId = number;

type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "cancelled";

interface Product {
  id: ProductId;
  name: string;
  description?: string;
  price: number;
  stock: number;
  available: boolean;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

interface OrderItem {
  productId: ProductId;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface Order {
  id: number;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
}

function calculateSubtotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
}

function findProductById(
  products: Product[],
  id: ProductId
): Product | undefined {
  return products.find((product) => product.id === id);
}

function updateStock(product: Product, quantity: number): Product {
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

function hasStock(product: Product, quantity: number): boolean {
  return quantity > 0 && quantity <= product.stock;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 2800000, stock: 5, available: true },
  { id: 2, name: "Mouse", price: 80000, stock: 20, available: true }
];

const items: OrderItem[] = [
  { productId: 1, productName: "Laptop", unitPrice: 2800000, quantity: 1 },
  { productId: 2, productName: "Mouse", unitPrice: 80000, quantity: 2 }
];

console.log("Subtotal mouse:", calculateSubtotal(80000, 2));
console.log("Total del pedido:", calculateOrderTotal(items));

const laptop = findProductById(products, 1);

if (laptop) {
  console.log("¿Hay 2 laptops disponibles?", hasStock(laptop, 2));
  console.log("Stock después de vender 1:", updateStock(laptop, 1).stock);
}