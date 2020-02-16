import nodemailer from 'nodemailer';
import { APP_URL } from './app';

const {
    MAIL_SERVICE = 'gmail',
    MAIL_SECURE = false,
    MAIL_PORT = 25,
    MAIL_AUTH_USERNAME = 'readit.mailer@gmail.com',
    MAIL_AUTH_PASSWORD = '!Readitmailer123'
} = process.env;

// export const transporter = nodemailer.createTransport({
//     service: MAIL_SERVICE,
//     secure: MAIL_SECURE,
//     port: MAIL_PORT,
//     auth: {
//         user: MAIL_AUTH_USERNAME,
//         password: MAIL_AUTH_PASSWORD
//     },
//     tls: {
//         rejectUnauthrized: false
//     }
// });

// export const registerMail = async (id) => {

//     const user =

//     return {
//         from: 'Read It Mailer <readit.mailer@gmail.com>',
//         to: email,
//         subject: 'Confirm registration!',
//         text: `Verify your account: ${APP_URL}:/verify/${verificationString}`
//     };
// };
