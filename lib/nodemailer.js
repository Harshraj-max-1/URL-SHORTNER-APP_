
import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount(); // create a test email account

const transporter = nodemailer.createTransport({        // configure the email server details (like sender email & password )
  host: "smtp.ethereal.email",    // ethereal email host
  port: 587,      // 465 for secure
  secure: false, // true for port 465, false for other ports
  auth: {
  user: testAccount.user,     // generated ethereal user
  pass: testAccount.pass,    // generated ethereal password
},
});

export const sendEmail = async ({ to, subject, html }) => {     
  const info = await transporter.sendMail({         //transporter compose the email
    from: `'URL SHORTENER' < ${testAccount.user} >`,
    to,
    subject,
    html,
  });

  const testEmailURL = nodemailer.getTestMessageUrl(info);    // get the test email URL
  console.log("verify Email: ", testEmailURL);        // log the test email URL to the console
};


// user: "harshraj@gmail.com",
//     pass: "harshraj",