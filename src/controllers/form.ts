import { Response, Request, NextFunction  } from "express"
import { IForm } from "../types/form"
import Form from "../models/form.js"
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// import cloudinary from 'cloudinary';
import * as cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

// const folderName = process.env.FOLDER_NAME;


const getAllFormSubmissions = async (req: Request, res: Response): Promise<any> => {
    try {

        const forms: IForm[] = await Form.find();

        if (forms.length === 0) {
            return res.status(404).json({ error: "There are currently no form submissions found in the database! Thank you for checking :)"})
        }

        return res.status(200).json({ message: "These are all the form submissions you have now!", forms})
    } catch (error) {
    throw error
    }
}

const createSubmission = async (req: Request, res: Response): Promise<any> => {
    try {

        const dateNow = Date.now();

        const { firstName, lastName, docsRef, ...otherFields } = req.body;

        const formName = req.body.formName;
        let folderName: string

        if (formName) {
            folderName = formName;
        } else {
            folderName = 'drafts';
        }

        let passportImageUrl = 'unnecessary here';
        let passportImagePublicId = 'unnecessary here';
        
        let idDocumentUrl = 'unnecessary here';
        let idDocumentPublicId = 'unnecessary here';

        let resultSlipUrl = 'unnecessary here';
        let resultSlipPublicId = 'unnecessary here';

        if (req.files && 'passportImage' in req.files) {
            const passportImageFileName = `${firstName}_${lastName}_passportImage_${dateNow}`;
            const passportImageCloudinaryResponse = await cloudinary.v2.uploader.upload(
                req.files['passportImage'][0].path,
                {
                    folder: folderName,
                    public_id: passportImageFileName,
                }
            );
            passportImageUrl = passportImageCloudinaryResponse.secure_url;
            passportImagePublicId = passportImageCloudinaryResponse.public_id;
        }

        if (req.files && 'idDocument' in req.files) {
            const idDocumentFileName = `${firstName}_${lastName}_idDocument_${dateNow}`;
            const idDocumentCloudinaryResponse = await cloudinary.v2.uploader.upload(
                req.files['idDocument'][0].path,
                {
                    folder: folderName,
                    public_id: idDocumentFileName,
                }
            );
            idDocumentUrl = idDocumentCloudinaryResponse.secure_url;
            idDocumentPublicId = idDocumentCloudinaryResponse.public_id;
        }

        if (req.files && 'resultSlip' in req.files) {
            const resultSlipFileName = `${firstName}_${lastName}_resultSlip_${dateNow}`;
            const resultSlipCloudinaryResponse = await cloudinary.v2.uploader.upload(
                req.files['resultSlip'][0].path,
                {
                    folder: folderName,
                    public_id: resultSlipFileName,
                }
            );
            resultSlipUrl = resultSlipCloudinaryResponse.secure_url;
            resultSlipPublicId = resultSlipCloudinaryResponse.public_id;
        }
        const formData: IForm = {
            fromForm: formName,
            firstName,
            lastName,
            passportImage: passportImageUrl,
            idDocument: idDocumentUrl,
            resultSlip: resultSlipUrl,
            docsRef: {
                passportImagePublicId,
                idDocumentPublicId,
                resultSlipPublicId
            },
            ...otherFields
        };

        const newForm: IForm = new Form(formData);

        await newForm.save();

        res.status(201).json({ message: "Form submitted successfully", Form: newForm })

    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Error submitting form' });
    }
}


const getSingleFormSubmission = async (req: Request, res: Response): Promise<any> => {
    try {

        const submissionId = req.params.id;
        const singleSubmission: IForm | null = await Form.findOne({ _id: submissionId });

        if (!singleSubmission) {
            res.status(404).json({ error: "That form submission doesn't exist on our database"})
            return;
        }

        res.status(200).json({ message: "This is the submission you requested", form: singleSubmission})
    } catch (error) {
    throw error
    }
}

const updateSubmission = async (req: Request, res: Response): Promise<any> => {
    try {
        const submissionId = req.params.id;
        const updateFields = req.body;

        const submission: IForm | null = await Form.findById(submissionId);

        if (!submission) {
            res.status(404).json({ error: "That form submission you are trying to update doesn't exist" });

            return;
        }

        const updatedSubmition: IForm | null = await Form.findOneAndUpdate( { _id: submissionId}, updateFields, { new: true });

        res.status(200).json({ message: "Form submission updated successfully", form: updatedSubmition})
            
    } catch (error) {
    throw error
    }
}

const exportFormSubmission = async (req: Request, res: Response): Promise<any> => {
    try {
        const submissionId = req.params.id;
        const submission: IForm | null = await Form.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ error: "That form submission you are trying to update doesn't exist" });
        }


        let submissionDetailsString = '';
        Object.entries(submission.toJSON()).forEach(([key, value]) => {
            submissionDetailsString += `${key}: ${value}\n`;
        });

        const directory = path.join(process.cwd(), 'exports');

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        const filePath = path.join(directory, `${submissionId}.txt`);

        const fileName = `${submissionId}.txt`;
        fs.writeFile(filePath, submissionDetailsString, (err) => {
            if (err) {
                throw err;
            }
            console.log(`form submission details saved to ${fileName}`);
        });

        const message = `form submssion details successfully exported. File saved as ${fileName}`;

        res.status(200).json({ message });
            
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while exporting submission details" });
    }
}

const archieveFormSubmission = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("archieveFormSubmission Logged");
            
    } catch (error) {
    throw error
    }
}

const deleteFormSubmission = async (req: Request, res: Response): Promise<any> => {
    try {
        const submissionId = req.params.id;
        const submission: IForm | null = await Form.findById(submissionId);

        if (!submission) {
            res.status(404).json({ error: "That form submission you are trying to delete doesn't exist" });

            return;
        }

        const deletedSubmission = await Form.findOneAndDelete({ _id: submissionId });

        res.status(200).json({ message: "form submission deleted successfully", form: deletedSubmission})
            
    } catch (error) {
    throw error
    }
}

const downloadSubmissionDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const submissionId = req.params.id;
        const submission = await Form.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ error: "Form submission not found" });
        }

        const submissionDetailsString = Object.entries(submission.toJSON())
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        // Set appropriate headers for downloading the file
        res.setHeader('Content-Disposition', `attachment; filename=${submissionId}.txt`);
        res.setHeader('Content-Type', 'text/plain');

        res.send(submissionDetailsString);
            
    } catch (error) {
    throw error
    }
}

const searchFormSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        console.error('Error searching form submissions:', error);
        res.status(500).json({ error: "An error occurred while searching form submissions" });
    }
};
export { getAllFormSubmissions, createSubmission, getSingleFormSubmission, updateSubmission, exportFormSubmission, archieveFormSubmission, deleteFormSubmission, downloadSubmissionDetails, searchFormSubmissions }