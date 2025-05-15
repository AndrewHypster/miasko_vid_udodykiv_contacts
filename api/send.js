const nodemailer = require("nodemailer");

export default async function handler (req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, phone, mssg } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "М'яско контакти",
    text: `
    Ім'я: ${name}
    Телефон: ${phone}
    ${mssg.lenght != 0 ? `\n${mssg}` : ""}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email надіслано!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка при надсиланні");
  }
};