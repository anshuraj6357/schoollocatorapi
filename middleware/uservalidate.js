const jwt = require('jsonwebtoken');



const userValidate = async (req, res, next) => {

    try {
        const token = req.cookies.anshucookies;

        if (!token) {
            return res.status(400).json({
                success: false,
                messageg: `not able to get the token `
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        console.log("req.user middleware", req.user)
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



module.exports = { userValidate }