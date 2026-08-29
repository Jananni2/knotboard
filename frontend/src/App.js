 import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import store from "./store";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Navbar from "./layout/Navbar";
import BoardCanvas from "./components/board/BoardCanvas";
import ErrorHandler from "./components/ErrorHandler";
import NotificationStack from "./components/NotificationStack";

function AppContent() {
    const token = useSelector((state) => state.auth?.token);

    return (
        <BrowserRouter>
            <ErrorHandler>

                {/* Show Navbar only when logged in */}
                {token && <Navbar />}

                <NotificationStack />

                <Routes>

                    {/* Login */}
                    <Route
                        path="/login"
                        element={
                            token
                                ? <Navigate to="/dashboard" replace />
                                : <Login />
                        }
                    />

                    {/* Dashboard */}
                    <Route
                        path="/"
                        element={
                            token
                                ? <Dashboard />
                                : <Navigate to="/login" replace />
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            token
                                ? <Dashboard />
                                : <Navigate to="/login" replace />
                        }
                    />

                    {/* Board */}
                    <Route
                        path="/board/:id"
                        element={
                            token
                                ? <BoardCanvas />
                                : <Navigate to="/login" replace />
                        }
                    />

                    {/* Unknown route */}
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />

                </Routes>

            </ErrorHandler>
        </BrowserRouter>
    );
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;