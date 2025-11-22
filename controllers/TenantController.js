const AuthService = require("../services/AuthService");
const TenantService = require("../services/TenantService");
const { sendResponse } = require("../utils/response");

class TenantController {
  static async create(req, res, next) {
    try {
      const userId = req.userId;

      const tenant = await TenantService.create({
        ...req.body,
        createdBy: userId,
        updatedBy: userId,
      });

      await AuthService.assignTenant(tenant.id, userId);

      return sendResponse(res, 201, "Tenant created successfully", tenant);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
}

module.exports = TenantController;
