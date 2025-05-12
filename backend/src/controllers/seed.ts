// EXAMPLE
// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import "dotenv/config";
// import Product, { ProductType } from "../models/product";

// const products: Array<ProductType> = [
//   {
//     id: 1,
//     title: "White T-Shirt",
//     photoSrc:
//       "https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 2,
//     title: "White Jacket",
//     photoSrc:
//       "https://images.pexels.com/photos/31800087/pexels-photo-31800087/free-photo-of-stylish-woman-in-white-lace-blouse-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
// ];

// export const seedDb = async (_req: Request, res: Response) => {
//   try {
//     await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

//     await Product.insertMany(products);

//     res.status(200).json({
//       status: 200,
//       message: "Database has been seeded successfully!",
//     });

//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error seeding database:", error);

//     res.status(500).json({
//       status: 500,
//       message: "An error occurred while seeding the database.",
//     });

//     mongoose.connection.close();
//   }
// };
