const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact',{layout: false});
});

app.post('/send', (req, res) => {
  const output = `
    <h2> ${req.body.name}ը ասումա <br>
    <հ6>${req.body.message}</հ6>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: 'Your e-mail', 
      pass: 'Your Password', 
    },
  });


  // setup email data with unicode symbols
  let mailOptions = {
      from: '<ex@ex.com>', // sender address
      to: 'Reciever Mail', // list of receivers
      subject: 'Մտքեր վերևից', // Subject line
      text: '', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent');   
      res.render('contact',{layout: false});
  });
  });

app.listen(3000, () => console.log('Server started...'));