import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.session.user); // Access the user from the session state

  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <NavLink to="/">About</NavLink>
        </li>
        <li>
          <a
            href="https://www.facebook.com/Aunt-Angies-Cookies-and-Co-100094284582480/?paipv=0&eav=AfZOrf9UNId3dD9uPDQDDA16zg69UQ_7sNPjbfMTYfHE3tPJAtfUKTmfdiODkEd_OUw&_rdr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        {user && ( // Only render this if the user is logged in
          <li>
            <NavLink to="/cookies">All Cookies</NavLink>
          </li>
        )}
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
