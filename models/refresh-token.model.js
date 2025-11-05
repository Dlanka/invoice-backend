const mongoose = require("mongoose");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");

const tokenSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  token: { type: String, required: true },
});

tokenSchema.plugin(baseFieldsPlugins);

const RefreshToken = mongoose.model("RefreshToken", tokenSchema);
module.exports = RefreshToken;
