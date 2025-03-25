const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

function generateTwoFactorSecret() {
  return speakeasy.generateSecret({ name: "SecureProductAPI" });
}

function generateQRCode(secret) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) reject(err);
      resolve(data_url);
    });
  });
}

function verifyTwoFactorToken(secret, token) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token
  });
}

module.exports = {
  generateTwoFactorSecret,
  generateQRCode,
  verifyTwoFactorToken
};