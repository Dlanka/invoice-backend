const AuthService = require("../services/AuthService");
const RefreshTokenService = require("../services/RefreshTokenService");
const { sendResponse } = require("../utils/response");

class AuthController {
  static isProduction = process.env.NODE_ENV === "production";

  static async create(req, res, next) {
    try {
      const user = await AuthService.create(req.body);

      return sendResponse(res, 201, "User registered successfully", user);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login(email, password);

      const accessToken = AuthService.generateAccessToken(user);
      const refreshToken = AuthService.generateRefreshToken(user);

      // user.refreshToken = refreshToken;
      await user.save();

      // Save refresh token in the db
      await RefreshTokenService.save({ userId: user._id, token: refreshToken });

      AuthService.setRefreshTokenCookie(res, refreshToken);

      AuthService.setAccessTokenCookie(res, accessToken);

      return sendResponse(res, 200, "Login successful", {
        id: user._id,
        accessToken,
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 401;
      }
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const token = req.cookies.refreshToken;

      const isValid = await RefreshTokenService.isValid({ token });

      if (!isValid) {
        const error = new Error("Invalid token");
        error.statusCode = 401;
        throw error;
      }

      const user = await AuthService.tokenVerify(
        token,
        process.env.REFRESH_TOKEN_SECRET
      );

      const accessToken = AuthService.generateAccessToken(user);

      AuthService.setAccessTokenCookie(res, accessToken);

      res.json({ accessToken });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 401;
      }
      next(error);
    }
  }

  static async authValidate(req, res, next) {
    res.json({ user: req.user || null });
  }

  static async logout(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  }
}

module.exports = AuthController;
