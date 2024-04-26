import express, { Express } from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/user.js"



import dotenv from 'dotenv';
dotenv.config();

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000


app.use(express.json());
app.use('/api/v1/user', userRoutes)

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Base-Forms';


mongoose
    .connect(uri)
    .then(() =>
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    )
)
.catch(error => {
    throw error
})



export default app