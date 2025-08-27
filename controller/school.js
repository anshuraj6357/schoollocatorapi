const connection = require('../config/database');
const { sendschoolcreationupdate, sendschoolupdatequickly } = require('../utils/mailsend')


//creating the school with middleware 


const createSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        const userId = req.user.id;
        const email = req.user.email;
        console.log("userId", userId)

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: `please fill all the field `
            })
        }

        const [foundnameadress] = await connection.query('SELECT * from school WHERE name=? AND address=?', [name, address])

        if (foundnameadress.length > 0) {
            return res.status(400).json({
                success: false,
                message: `this school is alreasy registered`
            })
        }
        const [result] = await connection.query(
            'INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        const school_id = result.insertId

        console.log(school_id);
        await connection.query(
            "INSERT INTO user_school (user_id, school_id) VALUES (?, ?)",
            [userId, school_id]
        );

        await sendschoolcreationupdate(email, name, address, latitude, longitude);

        return res.status(201).json({
            success: true,
            message: "School added successfully",
            id: result.insertId,
            result
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
const updateSchools = async (req, res) => {
    try {
        const {id} = req.body;
        const userId = req.user.id;
        const email = req.user.email;

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid school id"
            });
        }

        const { name, address, latitude, longitude } = req.body;

        // Check if this user is linked to the school
        const [findschoolcreator] = await connection.query(
            'SELECT * FROM user_school WHERE school_id=? AND user_id=?',
            [id, userId]
        );

        if (findschoolcreator.length === 0) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this school"
            });
        }

        // Update the school
        const [updateschool] = await connection.query(
            'UPDATE school SET name=?, address=?, latitude=?, longitude=? WHERE id=?',
            [name, address, latitude, longitude, id]
        );

        if (updateschool.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: `Not able to update the school`
            });
        }

        // Send email after successful update
        await sendschoolupdatequickly(email, name, address, latitude, longitude);

        return res.status(200).json({
            success: true,
            message: `School updated successfully`
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


//Haversine formula for calculating distance

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}


//getschool distance and sort them 
const getAllSchoolBydistance = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: `please give the latitude and the longitude`
            })
        }

        const [allSchool] = await connection.query('SELECT * FROM school');


        const claculatedistance = allSchool.map((school) => ({
            ...school,
            distance: getDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            )
        }))

        claculatedistance.sort((a, b) => a.distance - b.distance)

        return res.status(200).json({
            success: true,
            data: claculatedistance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



module.exports = { createSchool, getAllSchoolBydistance, updateSchools }