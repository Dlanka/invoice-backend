const mongoose = require("mongoose");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");
const baseJsonPlugin = require("../plugins/baseJsonPlugin");

const CategorySchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    default: null, // null = system-level category
    index: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  slug: {
    type: String,
    lowercase: true,
    trim: true,
    default: "",
    index: true,
  },

  description: {
    type: String,
    default: "",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  isSystem: {
    type: Boolean,
    default: false, // true → belongs to system, not a tenant
  },
});

CategorySchema.plugin(baseJsonPlugin);
CategorySchema.plugin(baseFieldsPlugins, { createdBy: true });

CategorySchema.pre("findOneAndUpdate", function () {
  const rawUpdate = this.getUpdate();

  const update = {
    ...rawUpdate,
    ...(rawUpdate.$set || {}),
  };

  if (!update.slug && update.name) {
    update.slug = update.name.toLowerCase().trim().replace(/\s+/g, "-");
  }

  // push back into Mongoose update
  this.setUpdate({
    ...rawUpdate,
    $set: {
      ...(rawUpdate.$set || {}),
      slug: update.slug,
    },
  });
});

CategorySchema.index({ slug: 1, tenantId: 1 }, { unique: true });

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
