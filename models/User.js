const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
require('dotenv').config()

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String,
    required: true
  },
  tokens: [{
    type: String,
  }],
  updated: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function (next) {
  this.updated = new Date();

  const { tokens } = this;
  const recentToken = tokens.slice(-1)[0];

  const ciphertext = CryptoJS.AES.encrypt(recentToken, process.env.AES_PASSKEY).toString();

  this.tokens[this.tokens.length - 1] = ciphertext;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;