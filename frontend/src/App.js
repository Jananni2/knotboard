 import React from "react";
import { Provider } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import store from "./store";

import Login from "./Login";
import Dashboard from "./Dashboard";

import Navbar from "./layout/Navbar";

import BoardCanvas from "./components/board/BoardCanvas";
import StickyNoteForm from "./components/board/StickyNoteForm";

import ErrorHandler from "./components/ErrorHandler";
import NotificationStack from "./components/NotificationStack";
 import FacilitatorSettings from "./components/dashboard/FacilitatorSettings";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>

                <ErrorHandler>

                    <NotificationStack />

                    <Navbar />

                    <Routes>

                        {/* Login */}
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
    path="/settings"
    element={<FacilitatorSettings />}
/>

                        Dashboard
                        <Route
                            path="/"
                            element={<Dashboard />}
                        />
 

                        {/* Board */}
                        <Route
                            path="/board/:id"
                            element={<BoardCanvas />}
                        />

                        

                        {/* Unknown URL */}
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