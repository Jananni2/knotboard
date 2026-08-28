import React from "react";
import { useSelector } from "react-redux";

function NotificationStack() {
    const error = useSelector(
        (state) => state.notes?.error
    );

    const authError = useSelector(
        (state) => state.auth?.error
    );

    const activeError = error || authError;

    if (!activeError) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 5000
            }}
        >
            <span>⚠️</span>{" "}
            <span>{activeError}</span>
        </div>
    );
}

export default NotificationStack;