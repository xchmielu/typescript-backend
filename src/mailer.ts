import nodemailer from 'nodemailer';
import { User } from './models';
import { APP_URL } from './config';
import { MAILER_OPTIONS } from './config';

interface MailOps {
    from: string;
    to: string;
    subject: string;
    text: string;
}

const transporter = nodemailer.createTransport(MAILER_OPTIONS);

export const registerMail = async (id: string) => {
    const user = await User.findById(id);
    const { email, _id } = user!;
    console.log(email, _id);
    return {
        from: 'Read It Mailer <readit.mailer@gmail.com>',
        to: email,
        subject: 'Confirm registration!',
        text: `Verify your account: ${APP_URL}:/verify/${_id}`
    };
};

export const sendMail = (mailOptions: MailOps) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`error: ${error}`);
        }
        console.log(`Message Sent ${info.response}`);
    });
};
