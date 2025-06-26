import { Request, Response } from "express";
import Product from "../models/product";

interface SearchProductsQuery {
  q?: string;
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const searchProducts = async (
  req: Request<{}, {}, {}, SearchProductsQuery>,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "10");
    const searchQuery = req.query.q || "";
    const sortBy = req.query.sortBy || "_id";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    console.log("Advanced search:", { searchQuery, sortBy, sortOrder });

    const searchFilter = searchQuery
      ? {
          $or: [
            {
              title: {
                $regex: searchQuery,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const totalItems = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const sortObject: any = {};
    sortObject[sortBy] = sortOrder;

    const products = await Product.find(searchFilter)
      .sort(sortObject)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems,
      },
      search: {
        query: searchQuery,
        sortBy,
        sortOrder: sortOrder === 1 ? "asc" : "desc",
      },
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

export const getProductSuggestions = async (
  req: Request<{}, {}, {}, { q?: string }>,
  res: Response
): Promise<void> => {
  try {
    const searchQuery = req.query.q || "";

    if (!searchQuery || searchQuery.length < 2) {
      res.json({ suggestions: [] });
      return;
    }

    const suggestions = await Product.find({
      title: {
        $regex: searchQuery,
        $options: "i",
      },
    })
      .select("title")
      .limit(5)
      .lean();

    const uniqueTitles = [...new Set(suggestions.map((s) => s.title))];

    res.json({
      suggestions: uniqueTitles,
    });
  } catch (error) {
    console.error("Error getting suggestions:", error);
    res.status(500).json({ error: "Failed to get suggestions" });
  }
};
