const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const baseFieldsPlugins = require("../plugins/baseFields.plugins");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleIds: {
    type: Array,
    default: [1],
  },
  status: {
    type: Number,
    default: 1,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.plugin(baseFieldsPlugins);

const User = mongoose.model("User", userSchema);
module.exports = User;
