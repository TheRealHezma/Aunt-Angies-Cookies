import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.session.user); // Access the user from the session state

  return (
    <ul>
      <li>
        <NavLink to="/">About</NavLink>

      </li>
      <li>
        <NavLink to="/cookies">All Cookies</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>

    </ul>
  );
}

export default Navigation;
