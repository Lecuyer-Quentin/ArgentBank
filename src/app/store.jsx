
import { configureStore } from "@reduxjs/toolkit";

import loginReducers from "./loginSlice";
import profileReducers from "./profileSlice";


/**
 * This module exports a Redux store created with the configureStore function from the Redux Toolkit.
 * The store is configured with the reducers for user login and user profile.
 *
 * @module store
 */
export const store = configureStore({
    // Reducers
    reducer: {
        // For user login
        login: loginReducers,
        // For user profile
        profile: profileReducers,
    },
});



