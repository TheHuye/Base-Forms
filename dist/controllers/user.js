import User from "../models/user.js";
import fs from 'fs';
import path from 'path';
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ error: "There are currently no users found in the database! Thank you for checking :)" });
        }
        return res.status(200).json({ message: "These are all the users you have now!", users });
    }
    catch (error) {
        throw error;
    }
};
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, fatherNames, motherNames, guardianNames, ...otherFields } = req.body;
        const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        const formattedLastName = lastName.toUpperCase();
        const formattedFatherNames = fatherNames.toUpperCase();
        const formattedMotherNames = motherNames.toUpperCase();
        const formattedGuardianNames = guardianNames.toUpperCase();
        const userData = {
            firstName: formattedFirstName,
            lastName: formattedLastName,
            fatherNames: formattedFatherNames,
            motherNames: formattedMotherNames,
            guardianNames: formattedGuardianNames,
            ...otherFields
        };
        // Create new user instance
        const newUser = new User(userData);
        // Save user to database
        await newUser.save();
        res.status(201).json({ message: "User created successfully", User: newUser });
    }
    catch (error) {
        throw error;
    }
};
const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const singleUser = await User.findOne({ _id: userId });
        if (!singleUser) {
            res.status(404).json({ error: "That user doesn't exist on our database" });
        }
        res.status(200).json({ message: "This is the user you requested", user: singleUser });
    }
    catch (error) {
        throw error;
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "That use you are trying to update doesn't exist" });
            return;
        }
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        throw error;
    }
};
const exportUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while exporting user details" });
    }
};
const archieveUser = async (req, res) => {
    try {
        console.log("archieveUser Logged");
    }
    catch (error) {
        throw error;
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "That use you are trying to delete doesn't exist" });
            return;
        }
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    }
    catch (error) {
        throw error;
    }
};
const downloadUserDetails = async (req, res) => {
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
    }
    catch (error) {
        throw error;
    }
};
const searchUsers = async (req, res) => {
    try {
    }
    catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: "An error occurred while searching users" });
    }
};
export { getAllUsers, createUser, getSingleUser, updateUser, exportUser, archieveUser, deleteUser, downloadUserDetails, searchUsers };
//# sourceMappingURL=user.js.map