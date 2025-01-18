import JWT from "jsonwebtoken";

export const jwtAuth = (req,res,next)=>{
    const token = req.cookies && req.cookies.token || null;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }

    try {
        const decoded = JWT.verify(token,process.env.JWT_SECRET);
        req.user={id:decoded.id,email:decoded.email}
        next()
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}