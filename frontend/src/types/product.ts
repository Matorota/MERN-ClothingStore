export type Product = {
  _id: string; // MongoDB-generated unique identifier
  title: string; // Title of the product
  photoSrc: string; // URL of the product's image
};

export type ProductInput = {
  title: string;
  photoSrc: string;
};
