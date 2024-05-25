import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import cors from "cors";
const folderName = process.env.FOLDER_NAME;
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URL = process.env.BACKEND_URL || `http://localhost${PORT}`;
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://app.thehuye.com'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/v1/user', userRoutes);
const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/${folderName}`;
const startServer = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running on ${URL}/api/v1`);
        });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
startServer();
export default app;
//# sourceMappingURL=app.js.map