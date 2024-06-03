import { Document } from "mongoose"
export interface IUser extends Document {
  name: string
  phone: string
  email: string
  password: string
  isAdmin: boolean
}