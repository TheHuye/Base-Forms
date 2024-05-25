import { IUser } from "../types/user"
import { model, Schema } from "mongoose";


const userSchema: Schema = new Schema(
{
    fromForm: {
            type: String,
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    DOB: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    whatsappPhone: {
        type: String,
    },
    idNumber: {
        type: String,
    },
    yearCompleted: {
        type: String,
    },
    schoolCat: {
        type: String,
    },
    combination: {
        type: String,
    },
    indexNumber: {
        type: String,
    },
    fatherNames: {
        type: String,
    },
    fatherPhone: {
        type: String,
    },
    motherNames: {
        type: String,
    },
    motherPhone: {
        type: String,
    },
    guardianNames: {
        type: String,
    },
    guardianPhone: {
        type: String,
    },
    countryOfBirth: {
        type: String,
    },
    countryResidence: {
        type: String,
    },
    countryNationality: {
        type: String,
    },
    province: {
        type: String,
    },
    district: {
        type: String,
    },
    sector: {
        type: String,
    },
    cell: {
        type: String,
    },
    village: {
        type: String,
    },
    disabilities: {
        type: String,
    },
    maritalStatus: {
        type: String,
    },
    work: {
        type: String,
    },
    passportImage: {
        type: String,
    },
    idDocument: {
        type: String,
    },
    resultSlip: {
        type: String,
    },
    docsRef : [{
        passportImagePublicId: String,
        idDocumentPublicId: String,
        resultSlipPublicId: String
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}
);

    userSchema.pre<IUser>('findOneAndUpdate', function(next) {
        this._update.updatedAt = new Date();
        next();
    });

export default model<IUser>("User", userSchema);
