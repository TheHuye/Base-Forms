import { Response, Request, NextFunction  } from "express"
import { IUser } from "../types/user"
// import { User } from "../models/user"

const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("getAllUsers Logged");
            
    } catch (error) {
    throw error
    }
}

const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("createUser Logged");
            
    } catch (error) {
    throw error
    }
}

const getSingleUser = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("getSingleUser Logged");
            
    } catch (error) {
    throw error
    }
}

const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("updateUser Logged");
            
    } catch (error) {
    throw error
    }
}

const exportUser = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("exportUser Logged");
            
    } catch (error) {
    throw error
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
        console.log("deleteUser Logged");
            
    } catch (error) {
    throw error
    }
}

export { getAllUsers, createUser, getSingleUser, updateUser, exportUser, archieveUser, deleteUser, }