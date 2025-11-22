const { default: mongoose } = require("mongoose");
const ProductService = require("../services/ProductService");
const { parseIncludeQuery } = require("../utils/query");
const { sendResponse } = require("../utils/response");

class ProductController {
  static async insertOrUpdate(req, res, next) {
    try {
      // Current User
      const userId = req.userId;
      const tenantId = req.tenantId;
      const includeArray = parseIncludeQuery(req.query?.include);

      const id = req.body?.id;

      // Filter by _id (if provided) AND tenantId
      let filter = { _id: new mongoose.Types.ObjectId(), tenantId }; // new doc

      if (id) {
        filter = {
          _id: id,
          tenantId,
        };
      }

      // Create or update
      const product = await ProductService.createOrUpdate(
        req.body,
        filter,
        userId
      );

      let response = { product };

      // Fetch products list
      if (includeArray.includes("products")) {
        response["products"] = await ProductService.findAll({ tenantId });
      }

      const message = `Product ${id ? "updated" : "created"} successfully`;

      return sendResponse(res, 201, message, response);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async findAll(req, res, next) {
    const tenantId = req.tenantId;
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 20;
    const filter = { tenantId };
    try {
      const product = await ProductService.findAll(filter);

      return sendResponse(res, 200, "Products received successfully", product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
