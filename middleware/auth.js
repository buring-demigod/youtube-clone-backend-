const User = require('../models/User');
const jwt = require('jsonwebtoken');
const decrypt = require('../utils/decrypt');
require('dotenv').config()

const auth = async (req, res, next) => {
  try {
    let payload;

    try {
      payload = jwt.verify(req.query.token, process.env.JWT_SECRETKEY);
    } catch (error) {
      throw new Error('Unauthorized');
    }

    const user = await User.findById(payload.id);
    if (!user) throw new Error('user not found');

    const encryptedToken = user.tokens.slice(-1)[0];
    const accessToken = decrypt(encryptedToken);
    req.user = user;
    req.accessToken = accessToken;
    next();
  } catch (error) {
    res.send({ error: error.message });
  }
}
module.exports = auth;