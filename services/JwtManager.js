const { sign } = require('jsonwebtoken');


class JwtManager {
  static async createToken(user) {
    return sign({
      data: {
        id: user.id,
        firstName: user.firstName
      }
    }, process.env.JWT_SECRET, { expiresIn: '60 days' });
  }
}

module.exports = JwtManager;