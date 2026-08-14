interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  available: boolean;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 2800000, stock: 5, available: true },
  { id: 2, name: "Monitor", price: 850000, stock: 8, available: true },
  { id: 3, name: "Mouse", price: 80000, stock: 0, available: false }
];

console.table(products);