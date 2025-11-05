module.exports = function baseFieldsPlugin(schema, options) {
  // Add common fields
  schema.add({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  // Optional: Add pre-save hook to auto-update `updatedAt`
  schema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });
};
