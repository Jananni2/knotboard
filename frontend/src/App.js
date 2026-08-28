 import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import store from "./store";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Navbar from "./layout/Navbar";
import BoardCanvas from "./components/board/BoardCanvas";
import ErrorHandler from "./components/ErrorHandler";
import NotificationStack from "./components/NotificationStack";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ErrorHandler>

                    <NotificationStack />

                    <Navbar />

                    <Routes>

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/board/:id"
                            element={<BoardCanvas />}
                        />

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/"
                                    replace
                                />
                            }
                        />

                    </Routes>

                </ErrorHandler>
            </BrowserRouter>
        </Provider>
    );
}

export default App;