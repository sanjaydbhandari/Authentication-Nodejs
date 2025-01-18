import UserModel from "../models/userSchema.js";
import emailValidator from "email-validator"
import bcrypt from "bcrypt"


export const signup = async (req,res)=>{
    try {
        const {name,email,password,confirmPassword} = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                succuss: false,
                message:"All fields are required",
            })
        }

        const valideEmail = emailValidator.validate(email)

        if(!valideEmail){
            return res.status(400).json({
                succuss:false,
                message:"Please Provide a valid email id",
            })
        }

        if(password != confirmPassword){
            return res.status(400).json({
                succuss:false,
                message:"Confirm Password doesn't match ",
            })
        }

        const userInfo = UserModel(req.body)

        const result = await userInfo.save()
        


        return res.status(200).json({
            succuss:true,
            data:result
        })
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                succuss:false,
                message:"Account already exist with provided email id",
            })
        }
        return res.status(400).json({
            succuss:false,
            message:error.message,
        })
    }
}

export const signin = async (req,res)=>{
    try{
        const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            succuss:false,
            message:"All Fields are required",
        })
    }

    const user = await UserModel.findOne({email}).select('+password')

    if(!user || !(await bcrypt.compare(password,user.password)))
    {
        return res.status(400).json({
            succuss:false,
            message:"invalid credentials",
        })
    }

    const token = user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge:24*60*60*1000,
            httpOnly:true,
        }

        res.cookie("token",token,cookieOption)

        return res.status(200).json({
            succuss:true,
            data:user
        })
    

    }catch(error){
        return res.status(400).json({
            succuss:false,
            message:error.message,
        })
    }
}

export const userInfo = (req,res) => {
    const userId = req.user.id;
    UserModel.findById(userId).then((result)=>{
        if(!result){
            return res.status(400).json({
                succuss:false,
                message:"User Not Found",
            })
        }
        return res.status(200).json({
            succuss:true,
            data:result
        })
    }).catch((error)=>{
        return res.status(400).json({
            succuss:false,
            message:error.message,
        })
    })
}

export const logout = (req,res) => {
    try {
        const cookieOption = {
            expires:new Date(Date.now()),
            httpOnly:true, 
        }
        res.cookie("token",null,cookieOption);
        return res.status(200).json({
            succuss:true,
            message:"Logout Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            succuss:false,
            message:error.message,
        })
    }
}