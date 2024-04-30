import { Document } from "mongoose"
import { Gender, MaritalStatus, schoolCategory } from "../enums/enums"


export interface IUser extends Document {
    _update: any
    // personal details
    firstName: string
    middleName: string
    lastName: string //kinyarwanda name
    gender: string
    DOB: string
    email: string
    phone: string
    whatsappPhone: string
    idNumber: string
    // education details
    yearCompleted: string
    schoolCat: string
    combination: string
    indexNumber: string
    // parental and guardian info
    fatherNames: string
    fatherPhone: string
    motherNames: string
    motherPhone: string
    guardianNames: string
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
    maritalStatus: string
    work: string
    // documents
    passportImage: string
    idDocument: string
    resultSlip: string
    // image fields
    docsRef: {
        key: string;
        value: any;
    }
    // dates
    createdAt: Date
    updatedAt: Date
}