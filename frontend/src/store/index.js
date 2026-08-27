 import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import noteReducer from "./slices/noteSlice";
import boardReducer from "./slices/boardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: noteReducer,
        boards: boardReducer,
    },
});

export default store;