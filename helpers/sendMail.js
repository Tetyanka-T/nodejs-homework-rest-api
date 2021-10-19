// const sgMail = require('@sendgrid/mail');
require('dotenv').config;

// const { SENDGRID_API_KEY } = process.env;

// const sendEmail = async (data) => {
//   sgMail.setApiKey(SENDGRID_API_KEY);
//   const email = { ...data, from: 'tatyana080489t@gmail.com' };
//   return await sgMail.send(email);
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'tatyanatu@meta.ua',
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: 'tatyanatu@meta.ua',
  };
  await transporter.sendMail(email);
};

module.exports = sendEmail;
