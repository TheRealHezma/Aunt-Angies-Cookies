import { NavLink, useLocation } from "react-router-dom";
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
  const cartItems = useSelector((state) => state.cart.items);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const location = useLocation();

  // Clear cart when navigating to '/cookies/thank-you'
  useEffect(() => {
    if (location.pathname === "/cookies/thank-you") {
      cartItems.forEach((item) => dispatch(removeItem(item.id)));
    }
  }, [location.pathname, dispatch, cartItems]);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
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
      dispatch(removeItem(itemId));
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

          <li className="shopping-cart">
            <button className="cart-button" onClick={toggleCart}>
              <ShoppingCartIcon className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-notification">{cartItems.length}</span>
              )}
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
