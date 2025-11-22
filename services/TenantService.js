const Tenant = require("../models/tenant.model");

class TenantService {
  static async create(data) {
    return await Tenant.create(data);
  }
}

module.exports = TenantService;
