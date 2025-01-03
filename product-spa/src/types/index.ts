export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  liked?: boolean;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
