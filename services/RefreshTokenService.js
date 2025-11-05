const RefreshToken = require("../models/refresh-token.model");

class RefreshTokenService {
  static async save({ userId, token }) {
    return await RefreshToken.updateOne(
      { userId },
      { $set: { token, userId } },
      {
        upsert: true,
      }
    );
  }

  static async delete({ userId }) {
    return await RefreshToken.findById(userId);
  }

  static async isValid({ token }) {
    const res = await RefreshToken.findOne({ token });

    if (!res?.token) return false;

    return res?.token && res?.token === token;
  }
}

module.exports = RefreshTokenService;
