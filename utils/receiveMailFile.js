const nodemailer = require('nodemailer');

module.exports = async (subject, text, fichier) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      service: 'gmail',
      auth: {
        user: 'skilloftheworldok@gmail.com',
        pass: 'andpyitaiwugryyv',
      },
    });
    const mailOption = {
      from: 'skilloftheworldok@gmail.com',
      to: 'contact@skilloftheworld.com',
      subject: subject,
      text: text,
      attachments: [
        {
          path: fichier,
        },
      ],
    };
    await transporter.sendMail(mailOption);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.log("Votre email n'a été pas envoyé ");
    console.log(error);
  }
};
