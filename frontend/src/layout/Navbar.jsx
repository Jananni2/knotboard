 import React from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
 const { boardId } = useParams();
    const user = useSelector((state) => state.auth?.user);
    // const token = useSelector((state) => state.auth?.token);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    // // Don't show navbar on login page / when not logged in
    // if (!token) {
    //     return null;
    // }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">KnotBoard</Link>
            </div>

            <div className="navbar-links">
                <Link to="/dashboard">
                    Dashboard
                </Link>
<Link to={`/activity/${boardId}`}>
    Recent Activity
</Link>
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