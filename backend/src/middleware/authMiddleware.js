import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const verifyToken = (res, req, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            res.status(401).json({message: "No token, authorization denied!"});
        }

        try {
            const decode = jwt.verity(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("The decoded user is: ", req.user)
            next();
        } catch (error) {
            res.status(400).json({message: "Token is not valid"});
        }
    }
}
