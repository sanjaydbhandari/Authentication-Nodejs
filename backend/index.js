import express from 'express';
import authRouter from './routes/authRoute.js';

const PORT = process.env.PORT || 3000

const app = express()
app.use("/signup",authRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})