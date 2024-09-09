const User = require("../model/User")
const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')
const jwtSecret = "3cc9671ea78296449b91ce1e02c7b0fd5c32411c7cb5029f2117bfc8754753e9a75ec6"


async function signup  (req, res, next)  {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/auth/signup`);
    const { username, password, admin } = req.body
    let role = "Basic"
    if (admin) { role = "Admin" }

    if (password.length < 4) {
        return res.status(411).json({ message: "Password less than 4 characters" })
    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            username,
            password: hash,
            role,
        })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: user._id, username, role: user.role },
                    jwtSecret,
                    {
                        expiresIn: maxAge,
                    }
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });
                res.status(201).json({
                    message: "User successfully created",
                    user: user._id,
                    redirect_path: "/home",
                })
            })
            .catch((error) =>
                res.status(409).json({
                    message: "User not successful created",
                    error: error.message,
                    redirect_path: "/home",
                })
            );
    });

}



async function signin (req, res) {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/auth/signin`);
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })

        } else {

            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        jwtSecret,
                        {
                            expiresIn: maxAge,
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    });

                    res.status(201).json({
                        message: "User successfully Logged in",
                        user: user._id,
                        redirect_path: "/home",
                    })

                } else {
                    res.status(400).json({ message: "Login not succesful" });

                }
            });
        }

    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

module.exports = { signup, signin };