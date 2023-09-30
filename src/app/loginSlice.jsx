import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_LOGIN_URL = 'http://localhost:3001/api/v1/user/login'  


// Thunk pour la connexion
export const login = createAsyncThunk(
    'user/login',
    async (credentials) => {
        try {
            const response = await axios.post(USER_LOGIN_URL, credentials)
            if (response.status === 200) {
                const token = response.data.body.token
                return { token }
            }
        } catch (error) {
            throw new Error(error)
        }
    }
)


/**
 * Redux slice for managing login state
 * @typedef {Object} LoginState
 * @property {string|null} token - The user's authentication token
 * @property {boolean} isLogged - Whether the user is logged in or not
 * @property {string} status - The status of the login request (loading, succeeded, failed)
 * @property {string|null} error - The error message if the login request fails
 */

const initialState = {
    token: localStorage.getItem('token') || null,
    isLogged: false,
    status: 'idle',
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        /**
         * Logs the user out by removing the token from local storage and setting isLogged to false
         * @param {LoginState} state - The current login state
         */
        logout: (state) => {
            localStorage.removeItem('token')
            state.isLogged = false
        },
        /**
         * Sets the user's authentication token in local storage and sets isLogged to true
         * @param {LoginState} state - The current login state
         * @param {PayloadAction<string>} action - The action containing the token payload
         */
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload)
            state.token = action.payload
            state.isLogged = true
        }
    },
    extraReducers(builder) {
        builder
            /**
             * Sets the login status to 'loading' when the login request is pending
             * @param {LoginState} state - The current login state
             */
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            /**
             * Sets the login status to 'succeeded' and sets the user's token when the login request is fulfilled
             * @param {LoginState} state - The current login state
             * @param {PayloadAction<{token: string}>} action - The action containing the token payload
             */
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token
                state.isLogged = true
            })
            /**
             * Sets the login status to 'failed' and sets the error message when the login request is rejected
             * @param {LoginState} state - The current login state
             * @param {PayloadAction<Error>} action - The action containing the error payload
             */
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


// Action
export const { logout, setToken } = loginSlice.actions

// Selector
export const getToken = (state) => state.login.token
export const getStatus = (state) => state.login.status
export const getIsLogged = (state) => state.login.isLogged
export const getError = (state) => state.login.error

// Reducer
export default loginSlice.reducer