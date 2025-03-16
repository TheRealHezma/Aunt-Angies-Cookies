import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutModal.css';

function CheckoutModal({ show, handleClose, cartItems }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleCheckoutNavigate = async () => {
        if (!userInfo.name.trim() || !userInfo.phone.trim() || !userInfo.email.trim()) {
            alert("Please fill in all fields before proceeding.");
            return;
        }

        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const requestBody = {
            userInfo: {
                name: userInfo.name.trim(),
                phone: userInfo.phone.trim(),
                email: userInfo.email.trim(),
            },
            cartItems,
            totalPrice,
        };

        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                handleClose();
                navigate('/cookies/thank-you', { state: { cartItems } });
            } else {
                console.warn("Failed to send email please try again later");
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    if (!show) return null;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Checkout</h3>
                <div className='checkout-list'>
                    <ul className="cart-items-in-checkout">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.url} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <p>{item.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>Your cart is empty</li>
                        )}
                    </ul>
                    <div className="user-info-form">
                        <h4>Enter Your Information</h4>
                        <div className='formName'>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={userInfo.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='formTel'>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={userInfo.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='formEmail'>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={userInfo.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleCheckoutNavigate} className="modal-checkout-button">
                        Checkout
                    </button>
                    <button onClick={handleClose} className="modal-cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutModal;
