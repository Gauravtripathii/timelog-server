import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const greetUser = (req, res) => {
    res.status(200).json({
        message: "Welcome"
    })
}

export const RegisterUser = async(req, res) => {
    const {email, username, name, password} = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const checkEmail = await User.findOne({email});
    if (checkEmail) {
        res.status(400).json({error: "Email already exists!"});
    }

    const checkUsername = await User.findOne({username});
    if (checkUsername) {
        res.status(401).json({error: "Username already exists!"});
    }

    const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        // TODO: welcome email to be added
        res.status(200).json({
            message: "Done-Baby",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const LoginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({error: "email does not exist!"})
        }

        const validPassword = await bcryptjs.compare(   password, user.password);
        if (!validPassword) {
            res.status(400).json({error: "you shall not pass"});
        }

         // create token data
         const tokenData = {
            id: user._id,   
            name: user.name,
            username: user.username,
            email: user.email
        };

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            message: 'Login Successful',
            success: true
        });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const LogoutUser = async(req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout Successful',
        success: true
    });
}
