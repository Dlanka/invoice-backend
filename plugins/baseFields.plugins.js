const mongoose = require("mongoose");

module.exports = function baseFieldsPlugin(schema, options) {
  schema.set("timestamps", true);

  if (options?.createdBy) {
    schema.add({
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    });

    schema.pre("findOneAndUpdate", function (next) {
      const userId = this.getOptions()?.currentUser;

      if (!userId) return next();

      this.set({ updatedBy: userId });

      next();
    });
  }

  // Optional: Add pre-save hook to auto-update `updatedAt`
  schema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });
};
