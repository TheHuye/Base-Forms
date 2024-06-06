import { Response, Request, NextFunction  } from "express"
import { sendEmail } from "./sendEmail.js"
import dotenv from 'dotenv';
dotenv.config();

const pickEmailBasedOnForm = (name: any, email: any, formName: any, userData: any) => {
    const checkSubmittedDetailsUrl = `${process.env.DEPLOYED_URL}/api/form/${userData._id}`
    try {
        if (formName === "loanAssist") {
            const subject = 'Thank You For Filling Our Form, Please Verify Your Details Below';
            const content = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 20px; background-color: #007BFF; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                        <h1>Form Submitted Successfully</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for filling the form so that we can help you in the upcoming loan application.</p>
                        <p><strong>Reason:</strong> We will assit you in loan application</p>
                        <p>Our goal is to help students get in the best universities that they desire and thank you for being part of our community.</p>
                        <p>Providing wrong details for your application can lead to error and therefor you not getting the loan, please click the button below to see if the details you submitted are correct or you can change them!</p>
                        <p style="text-align: center;">
                        <a href="${checkSubmittedDetailsUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Check Your Details</a>
                        </p>
                        <p>Thank you for submitting the form</p>
                        <p>Sincerely,<br>TheHuyeCom</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 0.9em; color: #666;">
                        <p>If you did not request this action or have further concerns, please contact us immediately at <a href="mailto:thehuyestudents@gmail.com">thehuyestudents@gmail.com</a>.</p>
                        <p>&copy; 2024 TheHuyeCom Ltd. All rights reserved.</p>
                    </div>
                </div>
            </div>`
            sendEmail(email, subject, content);
        } else if (formName === "collectData") {
            const subject = 'Thank You For Filling Our Form, Please Verify Your Details Below';
            const content = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 20px; background-color: #007BFF; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                        <h1>Form Submitted Successfully</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for filling the form!</p>
                        <p><strong>Reason:</strong> We will notify you</p>
                        <p>Our goal is to help students get in the best universities that they desire and thank you for being part of our community.</p>
                        <p>Providing wrong details for your application can lead to error please click the button below to see if the details you submitted are correct or you can change them!</p>
                        <p style="text-align: center;">
                        <a href="${checkSubmittedDetailsUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Check Your Details</a>
                        </p>
                        <p>Thank you for submitting the form</p>
                        <p>Sincerely,<br>TheHuyeCom</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 0.9em; color: #666;">
                        <p>If you did not request this action or have further concerns, please contact us immediately at <a href="mailto:thehuyestudents@gmail.com">thehuyestudents@gmail.com</a>.</p>
                        <p>&copy; 2024 TheHuyeCom Ltd. All rights reserved.</p>
                    </div>
                </div>
                </div>`
            sendEmail(email, subject, content);
        } else if (formName === "internship") {
            const subject = 'Thank You For Filling Our Form, Please Verify Your Details Below';
            const content = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 20px; background-color: #007BFF; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                        <h1>Form Submitted Successfully</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for filling the form! for this internship opportunity</p>
                        <p><strong>Reason:</strong> Internship Opportunity</p>
                        <!-- <p>Our goal is to help students get in the best universities that they desire and thank you for being part of our community.</p> -->
                        <p>Providing wrong details for your application can lead to error please click the button below to see if the details you submitted are correct or you can change them!</p>
                        <p style="text-align: center;">
                        <a href="${checkSubmittedDetailsUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Check Your Details</a>
                        </p>
                        <p>Thank you for submitting the form</p>
                        <p>Sincerely,<br>Internships Ltd</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 0.9em; color: #666;">
                        <p>If you did not request this action or have further concerns, please contact us immediately at <a href="mailto:internship4rw@gmail.com">internship4rw@gmail.com</a>.</p>
                        <p>&copy; 2024 Internship Ltd. All rights reserved.</p>
                    </div>
                </div>
                </div>`
            sendEmail(email, subject, content);
        } else {
            const subject = 'Thank You For Filling Our Form, Please Verify Your Details Below';
            const content = `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 20px; background-color: #007BFF; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                        <h1>Form Submitted Successfully</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for filling the form!</p>
                        <p><strong>Reason:</strong> Form Filled Opportunity</p>
                        <!-- <p>Our goal is to help students get in the best universities that they desire and thank you for being part of our community.</p> -->
                        <p>Providing wrong details for your application can lead to error please click the button below to see if the details you submitted are correct or you can change them!</p>
                        <p style="text-align: center;">
                        <a href="${checkSubmittedDetailsUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Check Your Details</a>
                        </p>
                        <p>Thank you for submitting the form</p>
                        <p>Sincerely,<br>Internships Ltd</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 0.9em; color: #666;">
                        <p>If you did not request this action or have further concerns, please contact us immediately at <a href="mailto:internship4rw@gmail.com">internship4rw@gmail.com</a>.</p>
                        <p>&copy; 2024 Internship Ltd. All rights reserved.</p>
                    </div>
                </div>
                </div>`
            sendEmail(email, subject, content);
        }
        
    } catch (error) {
    throw error
    }
}

export { pickEmailBasedOnForm }