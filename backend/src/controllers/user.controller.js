import { User } from "../models/user.model.js";
import Joi from "joi";

// Joi Schemas
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
});

const logOutSchema = Joi.object({
    email: Joi.string().email().required()
});

// Helper to generate and send tokens
const generateAccessAndRefereshTokens = async (userId) => {
    try {

        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {

        throw new Error("Something went wrong while generating tokens");

    }
};

const registerUser = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, password, email } = value;

        const exist = await User.findOne({ email: email.toLowerCase() });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            username: username.toLowerCase(),
            password: password,
            email: email.toLowerCase()
        });

        // Generate tokens

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User registered successfully",
                user: { id: user._id, username: user.username, email: user.email },
                accessToken,
                refreshToken
            });

    } catch (error) {
        console.error("Error in Registration:", error);
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate tokens

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const options = {

            httpOnly : true,
            secure : true
            
        }

        return res.status(201)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({
            message:"User logged in successfully",
            user:{
                username:user.username,
                age:user.age,
                email:user.email,
                id:user._id,
            accessToken,
            refreshToken
            }
        })

    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ message: error.message });
    }
};

const logOut = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: undefined } },
            { new: true }
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User Logged Out" });
            
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { registerUser, login, logOut };
