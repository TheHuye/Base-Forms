import { model, Schema } from "mongoose";
const userSchema = new Schema({
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
    guardian: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
export default model("User", userSchema);
//# sourceMappingURL=user.js.map