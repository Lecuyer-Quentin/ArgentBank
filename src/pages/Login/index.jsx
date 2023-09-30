import React from 'react'
import LoginForm from '../../features/form/LoginForm'

/**
 * Renders the Login page component.
 * @returns {JSX.Element} The Login page component.
 */
const Login = () => {
    return (
        <section className='login'>
            <LoginForm />
        </section>
    );
}

export default Login