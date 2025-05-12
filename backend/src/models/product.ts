import mongoose, { Schema } from "mongoose";

export type ProductType = {
  id: number;
  title: string;
  photoSrc: string;
};

const productSchema = new Schema<ProductType>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  photoSrc: { type: String, required: true },
});

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;
