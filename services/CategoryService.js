const { default: mongoose } = require("mongoose");
const Category = require("../models/category.model");
const BaseService = require("./BaseService");

class CategoryService {
  static async createOrUpdate(data, filter, userId) {
    return await BaseService.createOrUpdate(Category, filter, data, userId);
  }

  static async findAll(tenantId, page, limit) {
    const filter = {
      $or: [
        { isSystem: true },
        {
          tenantId,
          isSystem: false,
        },
      ],
    };

    return await BaseService.findAll(Category, filter, page, limit);
  }
}

module.exports = CategoryService;
