 import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth?.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                KnotBoard
            </div>

            <div className="navbar-links">
                <a href="/dashboard">Dashboard</a>

                {user?.role === "FACILITATOR" && (
                    <a href="/settings">Settings</a>
                )}
            </div>

            <div className="navbar-user">
                {user ? (
                    <>
                        <span>
                            Signed in as <strong>{user.username}</strong>
                        </span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </nav>
    );
}

export default Navbar;