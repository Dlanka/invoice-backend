const mongoose = require("mongoose");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");
const baseJsonPlugin = require("../plugins/baseJsonPlugin");

const ProductSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    default: null,
    index: true,
  },

  type: {
    type: String,
    enum: ["product", "service"],
    default: "product",
    index: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  sku: {
    type: String,
    trim: true,
    index: true,
  },

  barcode: {
    type: String,
    index: true,
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },

  description: {
    type: String,
    default: "",
  },

  costPrice: {
    type: Number,
    min: 0,
  },

  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  stock: {
    type: Number,
    default: null,
    min: 0,
  },

  unit: {
    type: String,
    enum: ["pcs", "kg", "g", "l", "ml", "pack", "box"],
    default: "pcs",
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.plugin(baseJsonPlugin);
ProductSchema.plugin(baseFieldsPlugins, { createdBy: true });

ProductSchema.index({ sku: 1, tenantId: 1 }, { unique: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
