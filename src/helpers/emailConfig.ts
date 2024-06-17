import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = (email: any, subject: any, content: any) => {
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: content,
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: string }) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Email was successecfully sent to: ${email}\nGoogle's Response: ${info.response}`);
    }
});
};

export default sendEmail;
