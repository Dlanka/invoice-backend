const mongoose = require("mongoose");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");
const baseJsonPlugin = require("../plugins/baseJsonPlugin");

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

tenantSchema.plugin(baseJsonPlugin);
tenantSchema.plugin(baseFieldsPlugins, { createdBy: true });

const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
