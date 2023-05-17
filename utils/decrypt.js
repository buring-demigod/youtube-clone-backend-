const CryptoJS = require('crypto-js');
require('dotenv').config()

const decrypt = (encryptedToken) => {
  const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, process.env.AES_PASSKEY);
  var plaintext = decryptedToken.toString(CryptoJS.enc.Utf8);
  return plaintext;
}

module.exports = decrypt;