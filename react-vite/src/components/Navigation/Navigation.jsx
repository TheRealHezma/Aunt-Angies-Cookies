import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { removeItem } from "../../redux/cartSlice";
import "./Navigation.css";
import logo from '../../../public/Updatedlogo.png';

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => state.cart.items); // Access cart items from Redux store
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId)); // Dispatch the removeItem action
  };

  return (
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
            <NavLink to="/">About</NavLink>
            <a
              href="https://www.facebook.com/Aunt-Angies-Cookies-and-Co-100094284582480"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </li>
        <li>
          <ProfileButton />
        </li>
        <li className="shopping-cart">
          <button onClick={toggleCart}>Cart</button>
          {cartOpen && (
            <div className="cart-dropdown">
              <h3>Shopping Cart</h3>
              <ul className="cart-items scrollable-cart">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <img src={item.url} alt={item.name} className="cart-item-image" />
                        <p>{item.name} - {item.quantity}</p>
                      </div>                      <button
                        className="remove-item-button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <li>Your cart is empty</li>
                )}
              </ul>
              <button className="checkout-button">
                <NavLink to="/checkout">Checkout</NavLink>
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;



// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";
// import logo from '../../../public/Updatedlogo.png'; // Import the logo image

// function Navigation() {
//   const user = useSelector((state) => state.session.user); // Access the user from the session state

//   return (
//     <nav className="navigation-bar">
//       <ul>
//         <li className="nav-logo-container">
//           {user ? (
//             <NavLink to="/cookies">
//               <img src={logo} alt="Logo" className="nav-logo" /> {/* Logo links to cookies page if user is logged in */}
//             </NavLink>
//           ) : (
//             <img src={logo} alt="Logo" className="nav-logo" />
//           )}
//         </li>
//         <li>
//           <div className="nav-links">
//             <NavLink to="/">About</NavLink>
//             <a
//               href="https://www.facebook.com/Aunt-Angies-Cookies-and-Co-100094284582480/?paipv=0&eav=AfZOrf9UNId3dD9uPDQDDA16zg69UQ_7sNPjbfMTYfHE3tPJAtfUKTmfdiODkEd_OUw&_rdr"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Facebook
//             </a>
//           </div>
//         </li>
//         <li>
//           <ProfileButton />
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navigation;
