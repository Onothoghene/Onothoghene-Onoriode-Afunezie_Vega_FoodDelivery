import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "fw-bold text-primary" : "";

    return (
        <div className="col-md-3 bg-light p-3 shadow-sm">
            <ul className="list-unstyled">
                <li className={`nav-item d-flex align-items-center p-2 rounded ${isActive("/profile-overview")}`}>
                    <Link className="nav-link" to="/profile-overview">My Account</Link>
                </li>
                <li className={`nav-item d-flex align-items-center p-2 rounded ${isActive("/order-history")}`}>
                    <Link className="nav-link" to="/order-history">Orders</Link>
                </li>
                <li className={`nav-item d-flex align-items-center p-2 rounded ${isActive("/user-address")}`}>
                    <Link className="nav-link" to="/user-address">Address Book</Link>
                </li>
                <li className={`nav-item d-flex align-items-center p-2 rounded ${isActive("/change-password")}`}>
                    <Link className="nav-link" to="/change-password">Change Password</Link>
                </li>
                <li className="nav-item mt-3 text-danger fw-bold d-flex align-items-center p-2 rounded">
                    <Link className="nav-link">Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
