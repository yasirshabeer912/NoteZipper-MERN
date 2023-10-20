import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context";
import {CiMenuFries} from 'react-icons/ci'

const Header = () => {
  const { isLoggedIn, user, logout } = useUser(); // Access the user state and the logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary p-3 shadow-none">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">
            NoteZipper
          </Link>
          {/* <button
            className="navbar-toggler text-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <CiMenuFries 
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-expanded="false"
            aria-label="Toggle navigation"
          className="TogglerIcon"
          />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex mx-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/mynotes"
                  >
                    My Notes
                  </Link>
                </li>
              )}
              {isLoggedIn ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-light"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
