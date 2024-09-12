import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from '../../../public/Updatedlogo.png'; // Import the logo image

function Navigation() {
  const user = useSelector((state) => state.session.user); // Access the user from the session state

  return (
    <nav className="navigation-bar">
      <ul>
        <li className="nav-logo-container">
          {user ? (
            <NavLink to="/cookies">
              <img src={logo} alt="Logo" className="nav-logo" /> {/* Logo links to cookies page if user is logged in */}
            </NavLink>
          ) : (
            <img src={logo} alt="Logo" className="nav-logo" />
          )}
        </li>
        <li>
          <div className="nav-links">
            <NavLink to="/">About</NavLink>
            <a
              href="https://www.facebook.com/Aunt-Angies-Cookies-and-Co-100094284582480/?paipv=0&eav=AfZOrf9UNId3dD9uPDQDDA16zg69UQ_7sNPjbfMTYfHE3tPJAtfUKTmfdiODkEd_OUw&_rdr"
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
      </ul>
    </nav>
  );
}

export default Navigation;
