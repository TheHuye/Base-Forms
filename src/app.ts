import express, { Express } from "express";
import mongoose from "mongoose";
import formRoutes from "./routes/form.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const folderName = process.env.FOLDER_NAME;

const app: Express = express();

const PORT: number = Number(process.env.PORT) || 5135;
const URL: string = process.env.BACKEND_URL || `http://localhost:${PORT}`;

const allowedOrigins = [
    '*',
    'https://thehuye.github.io',
    'https://base-forms.onrender.com',
    /^http:\/\/127\.0\.0\.1:\d+$/
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.some(o => typeof o === 'string' && o === origin) || allowedOrigins.some(o => o instanceof RegExp && o.test(origin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/form', formRoutes);
app.use('/api/user', userRoutes);
app.get('/', (req, res) => {
    res.send('welcome to TheHuye');
});

const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/${folderName}`;

const startServer = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Database connected successfully');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on ${URL}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();

export default app;
