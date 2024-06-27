import { Document } from "mongoose"


export interface IResponse extends Document {
    message: string;
    email: string;
    response: string;
    messageId: string;
    envelope: {
        from: string;
        to: string[];
    };
    accepted: string[];
    rejected: string[];
    pending: string[];
}