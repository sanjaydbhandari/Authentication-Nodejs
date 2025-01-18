import mongoose,{  Schema } from "mongoose";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from "bcrypt"

dotenv.config()

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"user name field is required"],
        maxLength:[30,"name must be less than 30 character"],
        minLenght:[2,"name must be greater than 2 character"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"email field is required"],
        lowercase:true,
        unique:[true,"already registered"],
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password field is required"],
        minLength:[6,"password must be greater than 6 character"],
        select:false,
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiryDate:{
        type:String,
    }
},{
    timestamps:true,
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})


userSchema.methods = {
    jwtToken(){
        return JWT.sign({id:this._id,email:this.email},process.env.JWT_SECRET,{
            expiresIn:'24h'
        })
    }
}

const UserModel = mongoose.model('User',userSchema)

export default UserModel;