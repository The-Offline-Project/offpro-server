const nodemailer = require("nodemailer");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

  
async function sendMail(to,subject,text, ){
  let mailOptions = {
    from: "efama@coronet.com",
    to: `${to}`,
    subject: `${subject}`,
    text: `${text}`
  };
  let info =await transporter.sendMail(mailOptions,(err,data) => {
    if (err){
      console.log("Error " + err);
      return;
    }
    console.log("Email sent successfully");
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports={
  sendMail
}
