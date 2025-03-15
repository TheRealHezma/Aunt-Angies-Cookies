import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutModal.css';

function CheckoutModal({ show, handleClose, cartItems }) {
    const navigate = useNavigate();

    const handleCheckoutNavigate = () => {
        alert("Feature coming soon");
        // navigate('/checkout', { state: { cartItems } });
    };

    if (!show) return null;

    // Calculate total price
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
