import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div>
      <nav>
        <div
          className="nav-wrapper blue darken-1"
          style={{ padding: "0 2rem" }}
        >
          <a href="/" className="brand-logo">
            Cutting the reference
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/links">Lists</Link>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
