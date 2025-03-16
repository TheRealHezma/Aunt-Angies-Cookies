require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors()); //use cors middleware
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com", // Yahoo SMTP server
    port: 465, // Use 587 if you prefer TLS
    secure: true, // Use false for port 587
    auth: {
        user: 'h4mansour12@yahoo.com',
        pass: 'process.env.YAHOO_APP_PASSWORD', // Replace with the App Password generated from Yahoo
    },
});

app.post('/send-email', async (req, res) => {
    const { cartItems, totalPrice } = req.body;

    if (!cartItems || cartItems.length === 0 || totalPrice === undefined) {
        return res.status(400).json({ error: "Invalid request. Cart items and total price are required." });
    }

    let itemsList = cartItems.map(item => `
        <p><strong>${item.name}</strong><br>Quantity: ${item.quantity}<br>Price: $${item.price.toFixed(2)}</p>
    `).join('');

    const mailOptions = {
        from: 'h4mansour12@yahoo.com',
        to: 'hezmam6@gmail.com', // Your email
        subject: 'Checkout Details',
        html: `
            <h3>Checkout Summary</h3>
            ${itemsList}
            <p><strong>Total: $${totalPrice.toFixed(2)}</strong></p>
        `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info); // Log the info
        res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
        console.error("Error sending email:", error);
        console.error("Error details:", error); // Log the entire error object
        res.status(500).json({ error: "Failed to send email", details: error.toString() });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
