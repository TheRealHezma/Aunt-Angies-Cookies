import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CheckoutModal.css';

function CheckoutModal({ show, handleClose, cartItems }) {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCheckoutNavigate = () => {
        // Display feature coming soon popup
        alert("Feature coming soon");

        // Navigate to the new checkout page (commented for now)
        // navigate('/checkout', { state: { cartItems } }); // Pass cartItems as state
    };

    if (!show) return null; // Return nothing if modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div>
                    <h3>Checkout</h3>
                </div>
                <div className='checkout-list'>
                    <ul className="cart-items-in-checkout">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.url} alt={item.name} className="cart-item-image" />
                                    <p>{item.name} - quantity: {item.quantity}</p>
                                    <div className='price'>
                                        <p>
                                            Price: {item.price}
                                        </p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>Your cart is empty</li>
                        )}
                    </ul>
                    <div>
                        <p>Total: </p>
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
