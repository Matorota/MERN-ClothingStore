import mongoose, { Schema } from "mongoose";

export type ProductType = {
  title: string;
  photoSrc: string;
};

const productSchema = new Schema<ProductType>({
  title: { type: String, required: true, trim: true },
  photoSrc: { type: String, required: true },
});

productSchema.index({ title: "text" });

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;
