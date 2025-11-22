const { default: mongoose } = require("mongoose");
const CategoryService = require("../services/CategoryService");
const { parseIncludeQuery } = require("../utils/query");
const { sendResponse } = require("../utils/response");

class CategoryController {
  static async insertOrUpdate(req, res, next) {
    try {
      // Current User
      const userId = req.userId;
      const includeArray = parseIncludeQuery(req.query?.include);

      const tenantId =
        req.body?.tenantId !== undefined ? req.body?.tenantId : req.tenantId;

      const id = req.body?.id;

      // Filter by _id (if provided) AND tenantId
      let filter = { _id: new mongoose.Types.ObjectId(), tenantId }; // new doc

      if (id) {
        filter = {
          _id: id,
          tenantId,
        };
      }

      const category = await CategoryService.createOrUpdate(
        req.body,
        filter,
        userId
      );

      let response = { category };

      // Fetch all categories
      if (includeArray.includes("categories")) {
        response["categories"] = await CategoryService.findAll(tenantId);
      }

      const message = `Category ${id ? "updated" : "created"} successfully`;

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

    try {
      const category = await CategoryService.findAll(tenantId);

      return sendResponse(
        res,
        200,
        "Categories received successfully",
        category
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
