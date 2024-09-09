const jwt = require("jsonwebtoken")
const jwtSecret = "3cc9671ea78296449b91ce1e02c7b0fd5c32411c7cb5029f2117bfc8754753e9a75ec6"

async function adminAuth  (req, res, next) {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/auth/admin`);

    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized because of error" + err})
            } else {
                if (decodedToken.role !== "Admin") {
                    return res.status(401).json({ message: "Not authorized or access forbidden for " + decodedToken.role + " role"})
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}


async function anyAuth (req, res, next) {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/auth/user`);

    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized because of error" + err })
            } else {
                if (decodedToken.role !== "Basic" && decodedToken.role !== "Admin") {
                    return res.status(401).json({ message: "Not authorized because role is unknown: " + decodedToken.role})
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

module.exports = { adminAuth, anyAuth };