import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config();

// user register controller

export async function userRegister(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ message: "Email Already in use", success: false })
        }

        const hashedpassword = bcrypt.hashSync(password, 10);

        const user = new User({ name, email, password: hashedpassword });
        const createdUser = user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, { expiresIn: "9999 years" });
        return res.status(201).json({ user, token, success: true })
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in Register API", success: false, error })
    }
}

// user login controller


export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not Found", success: false })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password", success: false })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "9999 years" });
        return res.status(201).json({ user, token, success: true })

    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in Login API", success: false, error })
    }
}


