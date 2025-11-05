const { z } = require("zod");
const passwordValidator = require("./passwordValidator");

const userValidator = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.email({ error: "Invalid email address" }),
  password: passwordValidator,
});

module.exports = userValidator;
