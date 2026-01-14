
import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({        // configure the email server details sender email & password
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
  user: testAccount.user,
  pass: testAccount.pass,
},
});

export const sendEmail = async ({ to, subject, html }) => {     // send email to, subject, html content
  const info = await transporter.sendMail({
    from: `'URL SHORTENER' < ${testAccount.user} >`,
    to,
    subject,
    html,
  });

  const testEmailURL = nodemailer.getTestMessageUrl(info);
  console.log("verify Email: ", testEmailURL);
};


// user: "harshraj@gmail.com",
//     pass: "harshraj",