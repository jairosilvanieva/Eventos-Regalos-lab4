export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
  }
  
  export interface ProductSearchResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  