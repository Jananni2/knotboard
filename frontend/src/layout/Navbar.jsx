
import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.auth?.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    // Get board ID from URL when we are inside /board/:id
    const boardId = location.pathname.startsWith("/board/")
        ? location.pathname.split("/")[2]
        : null;

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">KnotBoard</Link>
            </div>

            <div className="navbar-links">
                <Link to="/">
                    Dashboard
                </Link>

                {boardId ? (
                    <Link to={`/activity/${boardId}`}>
                        Recent Activity
                    </Link>
                ) : (
                    <span>
                        Recent Activity
                    </span>
                )}

                {user?.role === "FACILITATOR" && (
                    <Link to="/settings">
                        Settings
                    </Link>
                )}
            </div>

            <div className="navbar-user">
                <span>
                    Signed in as{"  "}
                    <strong>
                        {user?.username || "User"}
                    </strong>
                </span>

                <button
                    type="button"
                    className="btn-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

