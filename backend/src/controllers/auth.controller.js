import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createNewUser, findByEmail } from "../repositories/user.repository.js";

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const NormalizedRole = req.body.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER"
    
        const newuser = await createNewUser({
            email,
            password: hashedPassword,
            role: NormalizedRole,
            preferences: {}
        })
        res.status(201).json({message: `New User created!`});
    } catch (error) {
        console.error("Registration crash:", error);
        res.status(500).json({ error: "Internal server error." });         
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await findByEmail(email)
    
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        // matching the password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        )
        res.json({ token, message: "Login successful!" });
    } catch (error) {
        console.error("Login crash:", error);
        res.status(500).json({ error: "Internal server error." }); 
    }
}
