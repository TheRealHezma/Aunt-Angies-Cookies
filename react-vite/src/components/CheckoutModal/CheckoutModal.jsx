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
                <h3>Checkout</h3>
                <ul className="cart-items">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.url} alt={item.name} className="cart-item-image" />
                                <p>{item.name} - quantity: {item.quantity}</p>
                            </li>
                        ))
                    ) : (
                        <li>Your cart is empty</li>
                    )}
                </ul>
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

// Code below is commented out for future use

// import React from 'react';
// import './CheckoutModal.css';

// function CheckoutModal({ show, handleClose, cartItems, handleCheckout }) {
//     const handleCheckoutWithEmail = async () => {
//         try {
//             const response = await fetch('/api/cookies/checkout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ cartItems }),
//             });

//             if (response.ok) {
//                 alert('Order placed and email sent successfully');
//                 handleCheckout(); // Call your existing checkout logic here
//             } else {
//                 alert('Failed to send email');
//             }
//         } catch (error) {
//             console.error('Error during checkout:', error);
//             alert('An error occurred');
//         }
//     };

//     if (!show) return null; // Return nothing if modal is not open

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h3>Checkout</h3>
//                 <ul className="cart-items">
//                     {cartItems.length > 0 ? (
//                         cartItems.map((item) => (
//                             <li key={item.id} className="cart-item">
//                                 <img src={item.url} alt={item.name} className="cart-item-image" />
//                                 <p>{item.name} - quantity: {item.quantity}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <li>Your cart is empty</li>
//                     )}
//                 </ul>
//                 <div className="modal-buttons">
//                     <button onClick={handleCheckoutWithEmail} className="modal-checkout-button">
//                         Checkout
//                     </button>
//                     <button onClick={handleClose} className="modal-cancel-button">
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CheckoutModal;
