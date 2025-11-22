const { default: mongoose } = require("mongoose");
const CustomerService = require("../services/CustomerService");
const { parseIncludeQuery } = require("../utils/query");
const { sendResponse } = require("../utils/response");

class CustomerController {
  static async createOrUpdate(req, res, next) {
    try {
      // query params
      const includeArray = parseIncludeQuery(req.query?.include);
      const userId = req.userId;
      const tenantId =
        req.body?.tenantId !== undefined ? req.body?.tenantId : req.tenantId;

      const body = {
        ...req.body,
        tenantId,
      };

      const id = body?.id;

      let filter = { _id: new mongoose.Types.ObjectId(), tenantId }; // new doc

      if (id) {
        filter = { _id: id, tenantId };
      }

      const customer = await CustomerService.createOrUpdate(
        filter,
        body,
        userId
      );

      let response = { customer };

      if (includeArray.includes("customers")) {
        const customers = await CustomerService.findAll(tenantId);
        response["customers"] = customers;
      }

      const message = `Customer ${id ? "updated" : "created"} successfully`;

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
      const customers = await CustomerService.findAll(tenantId);

      return sendResponse(
        res,
        200,
        "Customers received successfully",
        customers
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
