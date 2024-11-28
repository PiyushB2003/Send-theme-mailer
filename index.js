import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const transporter = nodemailer.createTransport({
    service: 'gmail', // For Gmail, you can use other services like SMTP or Mailgun
    auth: {
        user: 'piyushborkar95@gmail.com',  // Replace with your email
        pass: 'hkqtnvblankbnrxa',
    },
});


app.post('/send-mail', (req, res) => {
    const { themeName } = req.body;

    console.log('Theme Name received:', themeName);

    // Prepare the email content
    const mailOptions = {
        from: 'piyushborkar95@gmail.com',  // Sender address
        to: 'piyushborkar97@gmail.com',  // Replace with the recipient's email
        subject: 'Theme Activated',  // Subject of the email
        text: `The theme ${themeName} has been activated on your site.`,  // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ success: true, message: `Theme ${themeName} processed and email sent successfully.` });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
