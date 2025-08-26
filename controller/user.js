const connection = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const userSignup = async (req, res) => {
    console.log("req.body", req.body)
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `please fil all the field carefully`
            })
        }
        const [existinguser] = await connection.query(`SELECT * FROM user where email=? `, [email]);
        if (existinguser.length > 0) {
            return res.status(400).json({
                success: false,
                message: `user alreasy exists with this email id`
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)

        const [creatinguser] = await connection.query(`INSERT INTO user  (email,name,password) VALUES(?,?,?)`, [email, name, hashedpassword]);

        if (creatinguser.affectedRows == 0) {
            return res.status(400).json({
                success: false,
                message: `user could not be created ,please try again`
            })
        }
        return res.status(200).json({
            success: true,
            message: `user created successfully`
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const userLogin = async (req, res) => {
    console.log("req.body", req.body);
    console.log("jwt", process.env.JWT_SECRET)
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `please fill all the field `
            })
        }

        const [foundeduser] = await connection.query('SELECT * FROM user WHERE email=?', [email]);

        if (foundeduser.length == 0) {
            return res.status(400).json({
                success: false,
                message: `user not exists with this email`
            })
        }
        const payload = {
            id: foundeduser[0].id,
            email: foundeduser[0].email,
            name: foundeduser[0].name
        }

        const isMatch = await bcrypt.compare(password, foundeduser[0].password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3h"
        });

        console.log("token", token)
        res.cookie('anshucookies', token, {
            expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
            httpOnly: true,
        }).status(201).json({
            success: true,
            message: `user loggedin successfully`
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const userUpdated = async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: `please fill the filled`
            })
        }

        if (id != req.user.id) {
            return res.status(400).json({
                success: false,
                message: `you are not authenticated to make the changes`
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const [founduser] = await connection.query("UPDATE user SET name=?,email=?,password=? WHERE id=?",
            [name, email, hashedpassword, id]
        )
        if (founduser.affectedRows == 0) {
            return res.status(400).json({
                success: false,
                message: `not updated the user `
            })
        }
        return res.status(201).json({
            success: true,
            message: `user updated successfully`
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};






module.exports = { userSignup, userLogin, userUpdated }
