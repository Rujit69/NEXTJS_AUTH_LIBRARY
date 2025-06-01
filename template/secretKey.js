//! RUN THIS as
// in terminal---> node secretKey.js
// to generate new NEXTAUTH_SECRET and paste it in .env file

console.log(require("crypto").randomBytes(32).toString("base64"));
