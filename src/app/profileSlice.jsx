import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_PROFILE_URL = 'http://localhost:3001/api/v1/user/profile'


// Thunk pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (token) => {
        const response = await axios.post(USER_PROFILE_URL, token, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                return response.data.body
            })
            .catch((error) => {
                console.log(error)
            }
        )
        return response
    }
)

//Thunk pour modifier le profil de l'utilisateur
export const editUserProfile = createAsyncThunk(
    'user/editUserProfile',
    async (token, { getState }) => {
        const newUserName = getState().profile.user.userName
        const response = await axios.put(USER_PROFILE_URL, {userName: newUserName}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                return response.data.body
            })
            .catch((error) => {
                console.log(error)
            }
        )
        return response
    }
)


// Slice pour le profil de l'utilisateur
/**
 * This module defines a Redux slice for the user profile.
 * @module profileSlice
 */
/**
 * The initial state of the user profile.
 * @typedef {Object} initialState
 * @property {Object} user - The user profile.
 * @property {string} status - The status of the user profile.
 * @property {string} error - The error message, if any.
 * @property {boolean} editMode - The edit mode of the user profile.
 */

const initialState = {
    user: {},
    status: 'idle',
    error: null,
    editMode: false
}

/**
 * Redux slice for managing the user profile.
 * @typedef {Object} profileSlice
 * @property {initialState} initialState - The initial state of the user profile.
 * @property {function} reducers - The reducers for the user profile.
 * @property {function} extraReducers - The extra reducers for the user profile.
 */
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        /**
         * Toggles the edit mode of the user profile.
         * @function
         * @name editMode
         * @param {initialState} state - The current state.
         */
        editMode: (state) => {
            state.editMode = !state.editMode
        },
        /**
         * Sets the user name of the user profile.
         * @function
         * @name setUserName
         * @param {initialState} state - The current state.
         * @param {Object} action - The action object.
         * @param {string} action.payload - The user name.
         */
        setUserName: (state, action) => {
            state.user.userName = action.payload
        }

    },
    extraReducers(builder) {
        builder
            // Fetch user profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        // Edit user profile
            .addCase(editUserProfile.pending, (state) => {
                state.status = 'loading'
            }
        )
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
                
            }
        )
            .addCase(editUserProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            }
        )

    }
})

export const { editMode, setUserName } = profileSlice.actions

export default profileSlice.reducer

export const selectUser = (state) => state.profile.user
export const selectStatus = (state) => state.profile.status
export const selectError = (state) => state.profile.error
export const selectEditMode = (state) => state.profile.editMode


        
