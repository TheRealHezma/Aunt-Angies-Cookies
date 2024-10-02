// import { NavLink } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import { removeItem } from "../../redux/cartSlice";
// import "./Navigation.css";
// import CheckoutModal from "../CheckoutModal/CheckoutModal";
// import logo from '../../../public/Updatedlogo.png';

// function Navigation() {
//   const user = useSelector((state) => state.session.user);
//   const cartItems = useSelector((state) => state.cart.items);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const cartRef = useRef(null);

//   const toggleCart = () => {
//     setCartOpen(!cartOpen);
//   };

//   const handleRemoveItem = (itemId) => {
//     dispatch(removeItem(itemId));
//   };

//   const handleCheckoutClick = () => {
//     setIsCheckoutModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsCheckoutModalOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (cartRef.current && !cartRef.current.contains(event.target)) {
//         setCartOpen(false);
//       }
//     };

//     if (cartOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [cartOpen]);

//   return (
//     <>
//       <nav className="navigation-bar">
//         <ul>
//           <li className="nav-logo-container">
//             {user ? (
//               <NavLink to="/cookies">
//                 <img src={logo} alt="Logo" className="nav-logo" />
//               </NavLink>
//             ) : (
//               <img src={logo} alt="Logo" className="nav-logo" />
//             )}
//           </li>
//           <li>
//             <div className="nav-links">
//               <NavLink to="/">About</NavLink>
//               <a
//                 href="https://www.facebook.com/Aunt-Angies-Cookies-and-Co-100094284582480"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Facebook
//               </a>
//             </div>
//           </li>
//         </ul>

//         {/* Centered Cart Button */}
//         <div className="cart-button-container">
//           <button className="cart-button" onClick={toggleCart}>Cart</button>
//         </div>

//         <ul>
//           <li>
//             <ProfileButton />
//           </li>
//         </ul>

//         {cartOpen && (
//           <div className="cart-dropdown" ref={cartRef}>
//             <h3>Shopping Cart</h3>
//             <ul className="cart-items scrollable-cart">
//               {cartItems.length > 0 ? (
//                 cartItems.map((item) => (
//                   <li key={item.id} className="cart-item">
//                     <div className="cart-item-info">
//                       <img src={item.url} alt={item.name} className="cart-item-image" />
//                       <p>{item.name} - quantity: {item.quantity}</p>
//                     </div>
//                     <button
//                       className="remove-item-button"
//                       onClick={() => handleRemoveItem(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))
//               ) : (
//                 <li>Your cart is empty</li>
//               )}
//             </ul>
//             <button className="checkout-button" onClick={handleCheckoutClick}>
//               Checkout
//             </button>
//           </div>
//         )}
//       </nav>

//       {isCheckoutModalOpen && (
//         <CheckoutModal
//           show={isCheckoutModalOpen}
//           handleClose={handleCloseModal}
//           cartItems={cartItems}
//         />
//       )}
//     </>
//   );
// }

// export default Navigation;


import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { removeItem } from "../../redux/cartSlice";
import "./Navigation.css";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import logo from '../../../public/Updatedlogo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
          <li className="shopping-cart">
            <button className="cart-button" onClick={toggleCart}>
              <ShoppingCartIcon className="cart-icon" />
            </button>
            {cartOpen && (
              <div className="cart-dropdown" ref={cartRef}>
                <h3>Shopping Cart</h3>
                <ul className="cart-items scrollable-cart">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <li key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <img src={item.url} alt={item.name} className="cart-item-image" />
                          <p>{item.name} - quantity: {item.quantity}</p>
                        </div>
                        <button
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
                <button className="checkout-button" onClick={handleCheckoutClick}>
                  Checkout
                </button>
              </div>
            )}
          </li>          <li>
            <ProfileButton />
          </li>
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
