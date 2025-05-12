import { Request, Response } from "express";
import Product from "../models/product";

export const postProduct = async (
  req: Request<{}, {}, { id: number; title: string; photoSrc: string }>,
  res: Response
) => {
  try {
    const body = req.body;
    const newProduct = await Product.create({
      id: body.id,
      title: body.title,
      photoSrc: body.photoSrc,
    });

    res.status(200).json({
      addedProduct: newProduct,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: "An error occured while adding a product.",
      validationErrors: null,
    });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  // TODO: Implement a try catch util
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: "An error occured while fetching products.",
      validationErrors: null,
    });
  }
};
