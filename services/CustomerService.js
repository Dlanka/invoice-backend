const { default: mongoose } = require("mongoose");
const { CustomerTypes } = require("../constants");
const Customer = require("../models/customer.model");
const BaseService = require("./BaseService");

class CustomerService {
  static async createOrUpdate(filter, data, userId) {
    return await BaseService.createOrUpdate(Customer, filter, data, userId);
  }

  static async findAll(tenantId, page, limit) {
    const filter = {
      $or: [
        { type: { $gt: CustomerTypes.Custom } },
        {
          tenantId,
          type: CustomerTypes.Custom,
        },
      ],
    };

    return await BaseService.findAll(Customer, filter, page, limit);
  }
}

module.exports = CustomerService;
