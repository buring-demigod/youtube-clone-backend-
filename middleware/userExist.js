const User = require('../models/User');

const userExist = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) req.user = user;

  next();
}
module.exports = userExist;