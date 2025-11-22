const BaseService = require("./BaseService");
const Product = require("../models/product.model");

class ProductService {
  static async createOrUpdate(data, filter, userId) {
    return await BaseService.createOrUpdate(Product, filter, data, userId);
  }

  static async findAll(filter, page, limit) {
    return await BaseService.findAll(Product, filter, page, limit).populate([
      { path: "tenantId", select: "id name" },
      { path: "categoryId", select: "id name" },
      { path: "createdBy", select: "id name" },
      { path: "updatedBy", select: "_id name" },
    ]);
  }
}

module.exports = ProductService;
