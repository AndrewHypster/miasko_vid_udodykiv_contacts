const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const app = express()
const port = 3000

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send', (req, res) => {
  const { name, phone, mssg } = req.body;  

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "М'яско контакти",
    text: `
    Ім'я: ${name}
    Телефон: ${phone}
    ${mssg.lenght != 0 ? `\n${mssg}` : ""}
    `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send('Невдалось надіслати')
    } else {
      res.status(200).send("Надіслано");
    }
  })
})

app.listen(port, () => {
  console.log(`Сервер працює на http://lcalhost:${port}`);
})