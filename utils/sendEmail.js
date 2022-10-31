const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      service: 'gmail',
      auth: {
        user: 'mahaubin@gmail.com',
        pass: 'raezzeusdvtftoui',
      },
    });
    const mailOption = {
      from: 'mahaubin@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };
    await transporter.sendMail(mailOption);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.log("Votre email n'a été pas envoyé ");
    console.log(error);
  }
};
