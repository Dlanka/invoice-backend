const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const RefreshTokenService = require("./RefreshTokenService");

class AuthService {
  static async create(data) {
    const user = await User.findOne({ email: data.email });

    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    return await User.create(data);
  }

  static async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid email address");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    return user;
  }

  static generateAccessToken(user) {
    return jwt.sign(
      { id: user._id || user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      { id: user._id || user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
  }

  static async tokenVerify(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err);
        else resolve({ id: decoded?.id });
      });
    });
  }

  static setAccessTokenCookie(res, token) {
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60 * 1000, // 15 min
    });
  }

  static setRefreshTokenCookie(res, token) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}

module.exports = AuthService;
