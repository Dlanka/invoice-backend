const { z } = require("zod");

const passwordValidator = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    error: "Must contain at least one uppercase letter (A-Z)",
  })
  .regex(/[a-z]/, {
    error: "Must contain at least one lowercase letter (a-z)",
  })
  .regex(/[0-9]/, { error: "Must contain at least one number (0-9)" })
  .regex(/[^A-Za-z0-9]/, {
    error: "Must contain at least one special character",
  });

module.exports = passwordValidator;
