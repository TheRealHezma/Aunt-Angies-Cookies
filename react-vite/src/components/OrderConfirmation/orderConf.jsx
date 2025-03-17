import { useLocation } from "react-router-dom";
import "./orderConf.css";

function OrderConf() {
    const location = useLocation();
    const cartItems = location.state?.cartItems || []; // Retrieve cart items from navigation state

    return (
        <div className="order-container">
            <h1>Thank you for your order! Aunt Ang will contact you shortly.</h1>
            <h2>Your Order:</h2>
            <ul className="order-list">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <li key={item.id} className="order-item">
                            <img src={item.url} alt={item.name} className="order-image" />
                            <div className="order-details">
                                <strong className="order-name">{item.name}</strong>
                                <p>Quantity: {item.quantity}</p>
                                <p className="order-price">Price: ${item.price.toFixed(2)}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </ul>
        </div>
    );
}

export default OrderConf;
