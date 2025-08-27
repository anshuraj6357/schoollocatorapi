const nodemailer = require('nodemailer');




const mailsend = async (email, title, body) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailoption = {
            to: email,
            subject: title,
            html: body
        }
        const info = await transporter.sendMail(mailoption);
        return info
    } catch (error) {
        console.log(error)
        return error
    }
}



const sendschoolcreationupdate = async (email, name, address, latitude, longitude) => {

    const subject = `school-Creation`
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2E86C1;">🎉 School Registration Successful!</h2>
        <p>Hi ${name},</p>
        <p>Your school has been successfully created in our system. Here are the details:</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
            <tr>
                <td style="padding: 8px; font-weight: bold;">School Name:</td>
                <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Address:</td>
                <td style="padding: 8px;">${address}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Latitude:</td>
                <td style="padding: 8px;">${latitude}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Longitude:</td>
                <td style="padding: 8px;">${longitude}</td>
            </tr>
        </table>
        <p style="margin-top: 20px;">Thank you for registering your school with us. You can now manage your school information and link it to your user account.</p>
        <p style="margin-top: 20px; font-size: 0.9em; color: #777;">This is an automated message. Please do not reply to this email.</p>
    </div>
    `;

    return await mailsend(email, subject, htmlBody)

}

const sendschoolupdatequickly = async (email, name, address, latitude, longitude) => {

    const subject = `Your school information has been updated successfully!`;

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #28B463;">✅ School Update Successful</h2>
        <p>Hi ${name},</p>
        <p>The details of your school have been successfully updated. Here are the updated information:</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
            <tr>
                <td style="padding: 8px; font-weight: bold;">School Name:</td>
                <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Address:</td>
                <td style="padding: 8px;">${address}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Latitude:</td>
                <td style="padding: 8px;">${latitude}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold;">Longitude:</td>
                <td style="padding: 8px;">${longitude}</td>
            </tr>
        </table>
        <p style="margin-top: 20px;">Thank you for keeping your school information up-to-date. You can now continue to manage your school easily.</p>
        <p style="margin-top: 20px; font-size: 0.9em; color: #777;">This is an automated message. Please do not reply to this email.</p>
    </div>
    `;

    return await mailsend(email, subject, htmlBody);
};


module.exports = { sendschoolcreationupdate ,sendschoolupdatequickly}