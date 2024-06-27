import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { IResponse } from "../types/response.js";
import ResponseModel from "../models/response.js";
import { closeLogStream } from './logger';

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Environment variables EMAIL_USER and EMAIL_PASSWORD must be set.');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

interface EmailOptions {
    email: string;
    subject: string;
    content: string;
}

const sendEmail = async ({ email, subject, content }: EmailOptions): Promise<void> => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: content,
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        const newResponse: IResponse = new ResponseModel({
            message: `Email was successfully sent to: ${email}`,
            email: email,
            response: info.response,
            messageId: info.messageId,
            envelope: info.envelope,
            accepted: info.accepted || [],
            rejected: info.rejected || [],
            pending: info.pending || [],
        });

        const savedResponse = await newResponse.save();
        
        console.log('Saved Response:', savedResponse);
    
    } catch (error) {
        console.error('Error sending email and saving response:', error);
        
        throw new Error('Failed to send email and save response');
    }
};

export default sendEmail;
