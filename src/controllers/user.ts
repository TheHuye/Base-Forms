import { Response, Request, NextFunction  } from "express"
import { IUser } from "../types/user"
import User from "../models/user.js"
import fs from 'fs';
import path from 'path';

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
        
        const user: IUser = new User(req.body)
        const newUser: IUser = await user.save()

        res.status(201).json({ message: "User created successfully", User: newUser})

    } catch (error) {
    throw error
    }
}

const getSingleUser = async (req: Request, res: Response): Promise<any> => {
    try {

        const userId = req.params.id;
        const singleUser: IUser | null = await User.findOne({ _id: userId });

        if (!singleUser) {
            res.status(404).json({ error: "That user doesn't exist on our database"})
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