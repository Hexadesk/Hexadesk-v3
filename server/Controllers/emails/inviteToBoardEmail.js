/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
import path from 'path';

const SendEmail = (data, from, subject, to) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com.',
            secure: false,
            port: 587,
            auth: {
                user: process.env.SERVICE_EMAIL,
                pass: process.env.SERVICE_PASS,
            },
            // tls: {
            //     rejectUnauthorized: false,
            // },
        });
        const mailOptions = {
            from,
            to,
            subject,
            html: `
            <div style="padding: 50px 100px;">
            <div style="text-align: center; margin-top:50px;">
            <img style="width: 200px; height: auto;" src="cid:realestate@kreata.ee"/>
            </div>
            <p style="text-align: left; font-weight:bold; margin-top: 50px; margin-bottom: 15px; line-height: 22px;  color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 20px;">
            Hi,
            </p>
            <p style="text-align: left; margin-top: 0px; margin-bottom: 30px; line-height: 22px;  color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 14px;">
            ${data.senderName} just invited you to the ${data.boardName} board on Hexa App Portal. Click the button below to go accept the invitation.
            </p>
            <div style="text-align: center; margin-bottom: 30px;">
              <a style="text-decoration: none; font-weight: bold" href="http://localhost:3001/invitation?boardId=${data.boardId}&&userEmail=${data.email}"> <button style="background: #FDA94F; cursor: pointer; padding: 10px 20px; border: none; border-radius: 8px; color: white; font-weight: bold; font-size: 16px;">Accept Invitation</button></a>
            </div>
     <p style="text-align: left;margin-bottom: 15px; line-height: 22px; margin-top: 0px; color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 14px;">
     If you think that this email is sent to you by mistake, please ignore this email or if you have any furthur queries related to our portal, feel free to <a style="display: inline-block; color: #1155CC; text-decoration: underline;font-size: 15px;"
     href="">Contact Us</a>. We will response to your queries as soon as possible.</p>
    <p style="text-align: left; font-weight:bold; margin-top: 0px; margin-bottom: 0px; line-height: 22px;  color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 14px;">
            Thanks,
            </p>
            <p style="text-align: left; font-weight:bold; margin-top: 0px; margin-bottom: 15px; line-height: 22px;  color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 14px;">
            Hexa App Team
            </p>
            </div>
     `,
            attachments: [{
                filename: 'image.png',
                path: path.join(__dirname, '../../hexa-logo.jpg'),
                cid: 'realestate@kreata.ee' //same cid value as in the html img src
            }]
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

const emailToExec = (req, res, next, data, from, subject, to) => {
    console.log(req.body);
    SendEmail(data, from, subject, to)
        .then(sent => {
            console.log('sent');
        })
        .catch(err => {
            console.log(err);
        });
};

export default { emailToExec };
