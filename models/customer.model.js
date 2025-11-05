const mongoose = require("mongoose");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  roleIds: {
    type: Array,
    default: [1],
  },
  status: {
    type: Number,
    default: 0,
  },
});

customerSchema.plugin(baseFieldsPlugins);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
