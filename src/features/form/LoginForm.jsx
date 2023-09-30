import React, { useEffect, useReducer, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, setToken } from '../../app/loginSlice'


const initialState = {
    email: '',
    password: '',
    saveUser: false,
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.payload }
        case 'password':
            return { ...state, password: action.payload }
        case 'saveUser':
            return { ...state, saveUser: action.payload }
        case 'error':
            return { ...state, error: action.payload }        
        default:
            throw new Error()
    }
}

const ACTIONS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    SAVE_USER: 'saveUser',
    ERROR: 'error',
}

/**
 * LoginForm component that handles user login form submission.
 * @returns {JSX.Element} Login form JSX element.
 */

const LoginForm = () => {
    const userRef = useRef()
    const errRef = useRef()
    const dispatchStore = useDispatch()
    const navigate = useNavigate()    
    const [state, dispatch] = useReducer(reducer, initialState)
    const canSubmit = [state.email, state.password].every(Boolean)

    //* Focus on email input on first render
    useEffect(() => {
        userRef.current.focus()
    }, [])

    //* Reset error message on email or password change
    useEffect(() => {
        dispatch({ type: ACTIONS.ERROR, payload: null })
    }, [state.email, state.password])

    //* Handle input changes
    const handleEmailChange = (e) => {
        dispatch({ type: ACTIONS.EMAIL, payload: e.target.value })
    }

    const handlePasswordChange = (e) => {
        dispatch({ type: ACTIONS.PASSWORD, payload: e.target.value })
    }

    const handleSaveUserChange = (e) => {
        dispatch({ type: ACTIONS.SAVE_USER, payload: e.target.checked })
    }

    //* Handle Submit
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                const response = await dispatchStore(login({
                    email: state.email,
                    password: state.password,
                    saveUser: state.saveUser
                })).unwrap()
                // Set token in store
                dispatchStore(setToken(response.token))

                if (state.saveUser) {
                    alert('User saved in local storage. Action not implemented yet.')
                }

                //Reset states
                dispatch({ type: ACTIONS.EMAIL, payload: '' })
                dispatch({ type: ACTIONS.PASSWORD, payload: '' })
                dispatch({ type: ACTIONS.SAVE_USER, payload: false })
                // Navigate to profile page
                navigate('/profile')
            } catch (error) {
                if (!error?.response?.status) {
                    dispatch({ type: ACTIONS.ERROR, payload: 'Email or password incorrect.' })
                } else {
                    dispatch({ type: ACTIONS.ERROR, payload: error.response.data.message })
                }
            }
        }
    }

    //* Render functions
    const renderError = () => {
        if (state.error) {
            return <span style={{ color: 'red' }} ref={errRef} >{state.error}</span>
        }
    }

    const renderLoginForm = () => {
        return (
            <form className="login__form" onSubmit={handleFormSubmit}>
                {renderError(errRef)}
                <h2>Sign In</h2>
                 <div className="login__form-control">
                   <label htmlFor="email">Email address</label>
                   <input
                    type='email'
                    id='email'
                    placeholder='Enter email'
                    ref={userRef}
                    required
                    value={state.email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="login__form-control">
                <label htmlFor="password">Password</label>
                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    required
                    value={state.password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="login__form-control">
                <label htmlFor="saveUser">Remember me</label>
                <input
                    type='checkbox'
                    id='saveUser'
                    checked={state.saveUser}
                    onChange={handleSaveUserChange}
                />
            </div>
            <button
                type='submit'
                disabled={!canSubmit}>
                Login
            </button>
        </form>
        )
    }

 
    return (
        <section>
            {renderLoginForm()}
        </section>
    )
}

export default LoginForm
