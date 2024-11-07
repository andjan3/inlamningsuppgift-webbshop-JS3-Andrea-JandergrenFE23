interface ProductDescription {
  Material: string;
  Fabric?: string;
  CareInstructions?: string;
  ArticleNumber?: string;
}

export interface Product {
  id: number;
  title: string;
  description: ProductDescription;
  price: number;
  color: string;
  imgUrl: string;
}
