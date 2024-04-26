import { Document } from "mongoose"
import { Gender, MaritalStatus, schoolCategory } from "../enums/enums"


export interface IUser extends Document {
    // personal details
    firstName: string
    middleName: string
    lastName: string
    gender: Gender
    DOB: Date
    email: string
    phone: string
    whatsappPhone: string
    idNumber: string
    // education details
    yearCompleted: Date
    schoolCat: schoolCategory
    combination: string
    indexNumber: string
    // parental and guardian info
    fatherNames: string
    fatherPhone: string
    motherNames: string
    motherPhone: string
    guardian: string
    guardianPhone: string
    // location status
    countryOfBirth: string
    countryResidence: string
    countryNationality: string
    province: string
    district: string
    sector: string
    cell: string
    village: string
    // additional details
    disabilities: string
    maritalStatus: MaritalStatus
    work: string
    // documents
    passportImage: string
    idDocument: string
    resultSlip: string
    // dates
    createdAt: Date
    updatedAt: Date
}