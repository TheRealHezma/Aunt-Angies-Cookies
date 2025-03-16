import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { removeItem } from "../../redux/cartSlice";
import "./Navigation.css";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import logo from '../../../public/Updatedlogo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { updateItemQuantity } from "../../redux/cartSlice";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => state.cart.items); // Access cart items from Redux store
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false); // Modal state
  const dispatch = useDispatch();
  const cartRef = useRef(null); // Create a ref for the cart dropdown

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId)); // Dispatch the removeItem action
  };

  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true); // Open the checkout modal when checkout is clicked
  };

  const handleCloseModal = () => {
    setIsCheckoutModalOpen(false); // Close the modal
  };

  // useEffect to handle clicks outside the cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false); // Close the cart if the click is outside the cart
      }
    };

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);

    if (quantity === 0) {
      dispatch(removeItem(itemId)); // Remove item if quantity is 0
    } else {
      dispatch(updateItemQuantity({ id: itemId, quantity }));
    }
  };

  return (
    <>
      <nav className="navigation-bar">
        <ul>
          <li className="nav-logo-container">
            {user ? (
              <NavLink to="/cookies">
                <img src={logo} alt="Logo" className="nav-logo" />
              </NavLink>
            ) : (
              <img src={logo} alt="Logo" className="nav-logo" />
            )}
          </li>
          <li>
            <div className="nav-links">
              {/* <NavLink to="/">About</NavLink> */}
              {/* <a
                href="https://www.facebook.com/Aunt-Angies-Cookies-and-Co-100094284582480"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon style={{ fontSize: 24, color: 'black' }} />
              </a> */}
            </div>
          </li>
          <li className="shopping-cart">
            <button className="cart-button" onClick={toggleCart}>
              <ShoppingCartIcon className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-notification">{cartItems.length}</span>
              )} {/* Red Dot with Item Count */}
            </button>
            {cartOpen && (
              <div className="cart-dropdown" ref={cartRef}>
                <h3>Shopping Cart</h3>
                <div className="shoppping-cart-items">
                  <ul className="cart-items scrollable-cart">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                          <div className="cart-item-info">
                            <img src={item.url} alt={item.name} className="cart-item-image" />
                            <p className="cart-item-name">{item.name}</p>
                            <div className="cart-item-quantity">
                              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                              <select
                                id={`quantity-${item.id}`}
                                className="quantity-selector"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              >
                                {[...Array(11).keys()].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <button
                              className="remove-item-button"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>Your cart is empty</li>
                    )}
                  </ul>
                </div>
                <div className="checkout-container">
                  <button
                    className="checkout-button"
                    onClick={handleCheckoutClick}
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </button>
                  {cartItems.length === 0 && (
                    <span className="checkout-tooltip">You need to add items to checkout</span>
                  )}
                </div>
              </div>
            )}
          </li>
          <ProfileButton />
        </ul>
      </nav>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <CheckoutModal
          show={isCheckoutModalOpen}
          handleClose={handleCloseModal}
          cartItems={cartItems}
        />
      )}
    </>
  );
}

export default Navigation;
