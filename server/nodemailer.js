const nodemailer = require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.Email,
    pass: process.env.Password,
    clientId:process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken
  },
});

const mailOptions = {
  from: "gitty691@gmail.com",
  to: "hi@hi.com",
};
module.exports = {
  transporter,
  mailOptions,
};
