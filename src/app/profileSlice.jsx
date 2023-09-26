import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_PROFILE_URL = 'http://localhost:3001/api/v1/user/profile'

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        userName: '',
    },
    status: 'idle',// 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // string
    editMode: false,
}


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
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        editMode: (state) => {
            state.editMode = !state.editMode
        },
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


        
