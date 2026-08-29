import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store/slices/authSlice";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector((state) => state.auth || {});
    const loading = authState.loading || false;
    const error = authState.error || null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(
            login({
                username,
                password
            })
        );

        if (!res.error) {
            navigate("/");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-card-header">
                    <h1>KnotBoard</h1>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>

                    {error && (
                        <p
                            style={{
                                color: "#ef4444",
                                fontWeight: 600
                            }}
                        >
                            {error}
                        </p>
                    )}

                </form>
            </div>
        </div>
    );
}

export default Login;