const nodemailer = require("nodemailer");
const path = require('path');
const hbs = require('nodemailer-express-handlebars')
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
         pass: process.env.MAIL_PASSWORD,
        // type: 'OAuth2',
        // user: process.env.MAIL_USERNAME,
        // pass: process.env.MAIL_PASSWORD,
        // clientId: process.env.OAUTH_CLIENTID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        // refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    const handlebarOptions = {
      viewEngine: {
          partialsDir: path.resolve('./src/views/'),
          defaultLayout: false,
      },
      viewPath: path.resolve('./src/views/'),
  };
  
  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions))
  
async function sendMail(to,subject,template, context){
  let mailOptions = {
    from: "offpro@gmail.com",
    to: `${to}`,
    subject: `${subject}`,
    template: template, // the name of the template file i.e email.handlebars
    context: context
  };
  let info =await transporter.sendMail(mailOptions,(err,data) => {
    if (err){
      console.log("Error " + err);
      return;
    }
    console.log("Email sent successfully");
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports={
  sendMail
}
