import React from 'react';
import './CheckoutModal.css';

function CheckoutModal({ show, handleClose, cartItems, handleCheckout }) {
    if (!show) return null; // Return nothing if modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Checkout</h3>
                <ul className="cart-items">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.url} alt={item.name} className="cart-item-image" /> {/* Display image */}
                                <p>{item.name} - quantity: {item.quantity}</p>
                            </li>
                        ))
                    ) : (
                        <li>Your cart is empty</li>
                    )}
                </ul>
                <div className="modal-buttons">
                    <button onClick={handleCheckout} className="modal-checkout-button">
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
