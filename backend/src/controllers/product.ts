import { Request, Response } from "express";
import Product from "../models/product";

export const postProduct = async (
  req: Request<{}, {}, { title: string; photoSrc: string }>,
  res: Response
): Promise<void> => {
  try {
    const body = req.body;
    const newProduct = await Product.create({
      title: body.title,
      photoSrc: body.photoSrc,
    });

    res.status(200).json({
      addedProduct: newProduct,
      status: 200,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({
      status: 500,
      message: "An error occurred while adding a product.",
      validationErrors: null,
    });
  }
};

export const updateProduct = async (
  req: Request<{ _id: string }, {}, { title: string; photoSrc: string }>,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.params;
    const body = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        title: body.title,
        photoSrc: body.photoSrc,
      },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({
        status: 404,
        message: "Product not found.",
      });
      return;
    }

    res.status(200).json({
      updatedProduct,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "An error occurred while updating the product.",
      validationErrors: null,
    });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({
        status: 404,
        message: "Product not found.",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Product deleted.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: "An error occurred while deleting the product.",
      validationErrors: null,
    });
  }
};

interface GetProductsQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  category?: string;
}

export const getProducts = async (
  req: Request<{}, {}, {}, GetProductsQuery>,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "10");
    const searchQuery = req.query.search || "";
    const sortBy = req.query.sortBy || "_id";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const category = req.query.category || "";

    console.log("Filter params received:", {
      searchQuery,
      sortBy,
      sortOrder: req.query.sortOrder,
      category,
    });

    const searchFilter: any = {};

    if (searchQuery.trim()) {
      searchFilter.title = {
        $regex: searchQuery.trim(),
        $options: "i",
      };
    }

    if (category && category !== "all") {
      const categoryKeywords = getCategoryKeywords(category);
      searchFilter.title = {
        ...searchFilter.title,
        $regex: categoryKeywords.join("|"),
        $options: "i",
      };
    }

    const totalItems = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const sortObject: any = {};
    sortObject[sortBy] = sortOrder;

    const products = await Product.find(searchFilter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort(sortObject);

    console.log(`Found ${products.length} products with filters`);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems,
      },
      filters: {
        search: searchQuery,
        sortBy,
        sortOrder: req.query.sortOrder || "desc",
        category,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "Failed to fetch products",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getCategoryKeywords = (category: string): string[] => {
  const categoryMap: Record<string, string[]> = {
    clothing: ["shirt", "jacket", "dress", "hoodie", "sweater", "blouse"],
    footwear: ["shoes", "sneakers", "boots", "sandals", "heels"],
    accessories: ["bag", "scarf", "hat", "cap", "belt", "watch", "jewelry"],
    tops: ["shirt", "t-shirt", "tank", "blouse", "hoodie", "sweater"],
    bottoms: ["jeans", "pants", "shorts", "skirt", "trousers"],
    outerwear: ["jacket", "coat", "blazer", "cardigan"],
  };

  return categoryMap[category.toLowerCase()] || [];
};

export const getProductCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({}, "title").lean();

    const categories = [
      { value: "all", label: "All Products", count: products.length },
      { value: "clothing", label: "Clothing", count: 0 },
      { value: "footwear", label: "Footwear", count: 0 },
      { value: "accessories", label: "Accessories", count: 0 },
      { value: "tops", label: "Tops", count: 0 },
      { value: "bottoms", label: "Bottoms", count: 0 },
      { value: "outerwear", label: "Outerwear", count: 0 },
    ];

    categories.forEach((category) => {
      if (category.value !== "all") {
        const keywords = getCategoryKeywords(category.value);
        category.count = products.filter((product) =>
          keywords.some((keyword) =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
        ).length;
      }
    });

    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      error: "Failed to fetch categories",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
