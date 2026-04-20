import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {

        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exist = await User.findOne({ email: email.toLowerCase() });
        
        if (exist) {
            return res.status(400).json({ message: "User already exist" })
        }

        const user = await User.create({

            username: username.toLowerCase(),
            password: password,
            email: email.toLowerCase()
        
        })

        return res.status(200).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email }
        })

    } catch (error) {

        console.log("Error in Registration:", error);
        return res.status(500).json({ message: error.message});
        
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({

            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email

            }
        })

    } catch (error) {

        console.log("Error in Login:", error);
        return res.status(500).json({ message: error.message });

    }
}

const logOut = async (req , res) => {

    try {

        const {email} = req.body;

        if(!email) return res.status(400).json({message: "Email is required"});

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(400).json({message: "User not found"});

        return res.status(200).json({message: "User Logged Out"});
        
    } catch (error) {
        
        res.status(500).json({ message:error.message });

    }

}

export { registerUser, login , logOut};