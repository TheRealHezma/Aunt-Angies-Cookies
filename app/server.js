require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true, // Use `false` for port 587
    auth: {
        user: 'h4mansour12@yahoo.com',
        pass: process.env.YAHOO_APP_PASSWORD,
    },
});

app.post('/send-email', async (req, res) => {
    const { userInfo, cartItems, totalPrice } = req.body;

    if (!userInfo || !userInfo.name || !userInfo.phone || !userInfo.email) {
        return res.status(400).json({ error: "Missing user information" });
    }

    const emailContent = `
        Name: ${userInfo.name}
        Phone: ${userInfo.phone}
        Email: ${userInfo.email}

        Order Summary:
        ${cartItems.map(item => `${item.name} x${item.quantity} - $${item.price.toFixed(2)}`).join('\n')}

        Total: $${totalPrice.toFixed(2)}
    `;

    try {
        await transporter.sendMail({
            from: 'h4mansour12@yahoo.com',
            to: 'hezmam6@gmail.com',
            subject: "Order Confirmation",
            text: emailContent,
        });

        console.log("Email sent successfully!");
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
