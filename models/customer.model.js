const mongoose = require("mongoose");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");
const { CustomerTypes } = require("../constants");
const baseJsonPlugin = require("../plugins/baseJsonPlugin");

const customerSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    default: null,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    default: null,
    index: true,
  },
  phoneNumber: {
    type: String,
    default: null,
    index: true,
  },
  address: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  type: {
    type: Number,
    enum: Object.values(CustomerTypes),
    default: CustomerTypes.Custom,
  },
  isSystem: {
    type: Boolean,
    default: false,
  },
});

customerSchema.plugin(baseJsonPlugin);
customerSchema.plugin(baseFieldsPlugins, { createdBy: true });

customerSchema.index({ name: 1, tenantId: 1 }, { unique: true });
customerSchema.index({ tenantId: 1 });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
