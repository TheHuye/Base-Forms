import { Response, Request, NextFunction  } from "express"
import { IUser } from "../types/user"
import User from "../models/user.js"
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

const folderName = process.env.FOLDER_NAME;


const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {

        const users: IUser[] = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ error: "There are currently no users found in the database! Thank you for checking :)"})
        }

        return res.status(200).json({ message: "These are all the users you have now!", users})
    } catch (error) {
    throw error
    }
}

const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { firstName, lastName, fatherNames, motherNames, guardianNames, docsRef, ...otherFields } = req.body;

        if ( !req.files || !('passportImage' in req.files) || !('idDocument' in req.files) || !('resultSlip' in req.files)) {
            return res.status(400).json({ error: "One or more files are missing" });
        }

        const dateNow = Date.now();
        
        const passportImageFileName = `${firstName}_${lastName}_passportImage_${dateNow}`;
        
        const passportImageCloudinaryResponse = await cloudinary.v2.uploader.upload(
            req.files['passportImage'][0].path,
            {
                folder: folderName,
                public_id: passportImageFileName,
            }
        );

        const passportImagePublicId = passportImageCloudinaryResponse.public_id;        

        const idDocumentFileName = `${firstName}_${lastName}_idDocument_${dateNow}`;
        
        const idDocumentCloudinaryResponse = await cloudinary.v2.uploader.upload(
            req.files['idDocument'][0].path,
            {
                folder: folderName,
                public_id: idDocumentFileName,
            }
        );

        const idDocumentPublicId = idDocumentCloudinaryResponse.public_id;        


        const resultSlipFileName = `${firstName}_${lastName}_resultSlip_${dateNow}`;
        
        const resultSlipCloudinaryResponse = await cloudinary.v2.uploader.upload(
            req.files['resultSlip'][0].path,
            {
                folder: folderName,
                public_id: resultSlipFileName,
            }
        );

        const resultSlipPublicId = resultSlipCloudinaryResponse.public_id;        


        // const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        // const formattedLastName = lastName.toUpperCase();
        // const formattedFatherNames = fatherNames.toUpperCase();
        // const formattedMotherNames = motherNames.toUpperCase();
        // const formattedGuardianNames = guardianNames.toUpperCase();

        const userData: IUser = {
            firstName,
            lastName,
            fatherNames,
            motherNames,
            guardianNames,
            passportImage: passportImageCloudinaryResponse.secure_url,
            idDocument: idDocumentCloudinaryResponse.secure_url,
            resultSlip: resultSlipCloudinaryResponse.secure_url,
            docsRef: {
                passportImagePublicId,
                idDocumentPublicId,
                resultSlipPublicId
            },
            ...otherFields
        };

        const newUser: IUser = new User(userData);

        await newUser.save();

        res.status(201).json({ message: "User created successfully", User: newUser })

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
}


const getSingleUser = async (req: Request, res: Response): Promise<any> => {
    try {

        const userId = req.params.id;
        const singleUser: IUser | null = await User.findOne({ _id: userId });

        if (!singleUser) {
            res.status(404).json({ error: "That user doesn't exist on our database"})
            return;
        }

        res.status(200).json({ message: "This is the user you requested", user: singleUser})
    } catch (error) {
    throw error
    }
}

const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;

        const user: IUser | null = await User.findById(userId);

        if (!user) {
            res.status(404).json({ error: "That use you are trying to update doesn't exist" });

            return;
        }

        const updatedUser: IUser | null = await User.findOneAndUpdate( { _id: userId}, updateFields, { new: true });

        res.status(200).json({ message: "User updated successfully", user: updatedUser})
            
    } catch (error) {
    throw error
    }
}

const exportUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "That user you are trying to update doesn't exist" });
        }

        // const exportName = user.idNumber;

        let userDetailsString = '';
        Object.entries(user.toJSON()).forEach(([key, value]) => {
            userDetailsString += `${key}: ${value}\n`;
        });

        const directory = path.join(process.cwd(), 'exports');

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        const filePath = path.join(directory, `${userId}.txt`);

        const fileName = `${userId}.txt`;
        fs.writeFile(filePath, userDetailsString, (err) => {
            if (err) {
                throw err;
            }
            console.log(`User details saved to ${fileName}`);
        });

        const message = `User details successfully exported. File saved as ${fileName}`;

        res.status(200).json({ message });
            
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while exporting user details" });
    }
}

const archieveUser = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("archieveUser Logged");
            
    } catch (error) {
    throw error
    }
}

const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            res.status(404).json({ error: "That use you are trying to delete doesn't exist" });

            return;
        }

        const deletedUser = await User.findOneAndDelete({ _id: userId });

        res.status(200).json({ message: "User deleted successfully", user: deletedUser})
            
    } catch (error) {
    throw error
    }
}

const downloadUserDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate the user details text content
        const userDetailsString = Object.entries(user.toJSON())
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        // Set appropriate headers for downloading the file
        res.setHeader('Content-Disposition', `attachment; filename=${userId}.txt`);
        res.setHeader('Content-Type', 'text/plain');

        // Send the user details text content as a response
        res.send(userDetailsString);
            
    } catch (error) {
    throw error
    }
}

const searchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: "An error occurred while searching users" });
    }
};

export { getAllUsers, createUser, getSingleUser, updateUser, exportUser, archieveUser, deleteUser, downloadUserDetails, searchUsers }