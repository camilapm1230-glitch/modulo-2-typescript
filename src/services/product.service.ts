import type { Product } from "../models/product.js";
import type { ServiceResponse } from "../types/response.js";

export function findProductById(
  products: Product[],
  id: number
): Product | undefined {
  return products.find((product) => product.id === id);
}

export function updateStock(product: Product, quantity: number): Product {
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

export function getAvailableProducts(products: Product[]): Product[] {
  return products.filter((product) => product.available);
}
export function searchProducts(
  products: Product[],
  term: string
): Product[] {
  const normalizedTerm = term.toLowerCase();

  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedTerm)
  );
}
export function getCatalogResponse(
  products: Product[]
): ServiceResponse<Product[]> {
  return {
    success: true,
    message: "Catálogo obtenido correctamente",
    data: products
  };
}