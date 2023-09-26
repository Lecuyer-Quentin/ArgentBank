import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editMode, setUserName, editUserProfile, selectUser } from '../../app/profileSlice'
import { getToken } from '../../app/loginSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
    newUserName: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'newUserName':
            return { ...state, newUserName: action.payload }
        default:
            throw new Error()
    }
}

const ACTIONS = {
    USERNAME: 'newUserName'
}


const EditForm = () => {

    const navigate = useNavigate()
    const dispatchStore = useDispatch()
    const token = useSelector(getToken)
    const [state, dispatch] = useReducer(reducer, initialState )
    const user = useSelector(selectUser)
    const { firstName, lastName } = user
    const canSubmit = [state.newUserName].every(Boolean)

  

    // Handle input changes
    const handleUserNameChange = (e) => {
        dispatch({ type: ACTIONS.USERNAME, payload: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                dispatchStore(setUserName(state.newUserName))
                dispatchStore(editUserProfile(token))
                dispatchStore(editMode(false))
                navigate('/profile')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCancel = () => {
        dispatchStore(editMode(false))
        dispatch({ type: ACTIONS.USERNAME, payload: '' })
        navigate('/profile')
    }

    // Render edit form
    const renderEditForm = () => {
        return (
            <form className='editForm' onSubmit={handleSubmit}>
                <h2>Edit user info</h2>
                <div className='editForm__user'>
                    <label htmlFor="newUserName">User name</label>
                    <input
                        type="text"
                        id="newUserName"
                        placeholder="Enter new username"
                        value={state.newUserName}
                        onChange={handleUserNameChange}
                        />
                </div>
                <div className='editForm__user'>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder={firstName}
                        disabled
                        />
                </div>
                <div className='editForm__user'>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder={lastName}
                        disabled
                    />
                </div>

                <div className='editForm__btn'>
                    <button>Save</button> 
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
                
            </form>
        )
    }


    return (
      
        <>
            {renderEditForm()}
        </>
  )
}

export default EditForm