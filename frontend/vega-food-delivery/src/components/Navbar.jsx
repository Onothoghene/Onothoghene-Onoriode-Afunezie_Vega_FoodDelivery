import React, { useEffect, useState } from "react";
import { FaHome, FaInfo, FaShoppingCart, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CartBadge from "./CartBadge";
import toast from "react-hot-toast";
import { IoRestaurant } from "react-icons/io5";
import FullSpinner from "./FullSpinner";

const Navbar = () => {
  const { authUser, authToken, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(authUser);

  //  const handleLogout = async (e) => {
  //   e.preventDefault();
  //   setLoggingOut(true);

  //   const isSuccess = logout();
  //   if (isSuccess) {
  //       toast.success("Logged Out Successfully");
  //       navigate("/home");
  //   } else {
  //       console.error("Log out failed");
  //   }

  //   setLoggingOut(false);
  // };

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authUser); // Update state when authUser changes
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [authUser]); // Re-run when authUser changes


  const handleLogout = (e) => {
    e.preventDefault();
    setLoggingOut(true);

    logout();
    window.location.reload();
  };


  return (
    <>

      {/* Full-Screen Spinner */}
      {loggingOut && (
        <FullSpinner />
      )}

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            Vega Food Delivery
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  <FaHome className="mb-1" />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <FaInfo className="mb-1" />
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="menu">
                  <FiMenu className="mb-1" />
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="restaurant">
                  <IoRestaurant className="mb-1" />
                  Restaurants
                </Link>
              </li>

              {/* Show Admin Links If User is Admin */}
              {/* {authUser?.roles.includes("Admin") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-dashboard">
                    <FiMenu className="mb-1" /> Admin Dashboard
                  </Link>
                </li>
              )} */}


              {/* Account Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser className="mb-1" /> {authUser ? authUser.firstName : "Account"}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  {authUser ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/profile-overview">
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/order-history">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <button
                          className=" btn btn-outline-danger dropdown-item text-danger fw-bold d-flex"
                          onClick={handleLogout}
                          type="button">Log Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/registration">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <Link className="nav-link position-relative" to="/cart">
                <FaShoppingCart className="mb-1" />
                Cart
                <CartBadge />
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
