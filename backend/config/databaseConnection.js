import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database" 

const databaseConnection =  () => {
    mongoose.connect(MONGODB_URL).then((e)=>console.log(`MongoDB Connected: ${e.connection.host}`)).catch((e)=>console.log(e.message))

}

export default databaseConnection