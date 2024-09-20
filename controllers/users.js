import User from "../models/userModel.js";

export const greetUser = (req, res) => {
    res.status(200).json({
        message: "Welcome"
    })
}

export const RegisterUser = async(req, res) => {
    // console.log(req.body)
    const user = req.body
    // console.log(user)
    const newUser = new User({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
    })
    try {
        await newUser.save()
        res.status(200).json({
            message: "Done-Baby",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
