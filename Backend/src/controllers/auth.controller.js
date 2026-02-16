import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req , res , next) => {
    try {
        const { name , email , password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registration successfull"
        });
    
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res , next) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({ email});
        if(!user)
            return res.status(401).json({message : "Invalid credentials"});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).json({message : "Invalid credentials"});
        const token = generateToken(user._id,user.role);
        res.status(200).json({token});
    }
    catch (error) {
        next(error);
    }
};