import express from 'express';
import {authRouter} from './routes/authRoute.js';
import databaseConnection from './config/databaseConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

databaseConnection()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

app.use("/v1/auth",authRouter)

export default app