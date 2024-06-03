import bcrypt from "bcryptjs";
import { Response, Request } from "express"
import { IUser } from "../types/user.js"
import User from "../models/user.js"
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';


const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

const createAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, phone, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "A user with that email already exists, if that is you.. please login or reset your password" });
    }

    const user: IUser = new User({
      name,
      phone,
      email,
      password,
      isAdmin,
    })

    const newUser: IUser = await user.save()
    
    res
      .status(201)
      .json({ message: "User Created Successfully", user: { name, email } })
  } catch (error) {
    throw error
  }
}

const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const { id, name, email: userEmail, isAdmin } = user;
    
    const token = jwt.sign({ id, username: name, email: userEmail, isAdmin }, jwtSecret)

    const expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

      res.cookie(
        'jwt',
        token,
        {httpOnly: true, path: '/', expires: expiryDate},
        
      ),
    
      res.status(200).json({ message: "User logged in successfully", user: { id, username: name, email: userEmail, isAdmin }, token });
  } catch (error) {
    // Handle any errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ users })
  } catch (error) {
    throw error
  }
};

const modifyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;
    const updateFields = req.body;
    const { name, phone, email, password } = req.body;

    // Check if the 'password' field is being updated
    if (updateFields.password) {
      // Hash the new password
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

    const updatedUser: IUser | null = await User.findOneAndUpdate(
      { _id: userId },
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'User updated',
      user: {
        name: name,
        phone: phone,
        email: email,
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { password, confirmation } = req.body;
    const userId = req.userId;
    // const isAdmin = req.isAdmin;

    
    // if (isAdmin === true) {
    //   const deletedUser = await User.findOneAndDelete({ _id: userId });
    //   return res.status(200).json({
    //     message: 'User deleted successfully',
    //     user: deletedUser,
    //   });
    // }

    if (!password || typeof confirmation !== 'boolean') {
      return res.status(400).json({ error: 'Password and confirmation are required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || !confirmation) {
      return res.status(401).json({ error: 'Invalid password or confirmation' });
    }

    const deletedUser = await User.findOneAndDelete({ _id: userId });

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logoutUser = (req: Request, res: Response): void => {
  if (!req.userId) {
    res.status(401).json({ error: 'User is not logged in' });
    return;
  }
  
  res.clearCookie('jwt', { path: '/' });

  res.status(200).json({ message: 'User logged out successfully' });
};

const getSingleUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({  });
    }

    const { _id, name, phone, email } = user;
    
    res.status(200).json(
      { message: "You are logged in as",
        user: {
          _id,
          name,
          phone,
          email,
        },
      }
    );
  } catch (error) {
    throw error
  }
};



export { createAccount, loginUser, getAllUsers, modifyUser, deleteUser, logoutUser, getSingleUser }