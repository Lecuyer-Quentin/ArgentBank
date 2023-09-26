import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_LOGIN_URL = 'http://localhost:3001/api/v1/user/login'  
// const USER_SIGNUP_URL = 'http://localhost:3001/api/v1/user/signup'


const initialState = {
    user: {},
    token: localStorage.getItem('token'),
    status: 'idle',// 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isLogged: false,

}


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


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            // state.token = null
            localStorage.removeItem('token')
            state.isLogged = false
        },
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload)
            state.token = action.payload
            state.isLogged = true
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token
                state.isLogged = true
            })
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