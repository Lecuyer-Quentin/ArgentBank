import React  from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getIsLogged, logout } from '../../app/loginSlice'
import { selectUser, selectEditMode } from '../../app/profileSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const logo = require('../../assets/images/argentBankLogo.jpg')


const Header = () => {

    const dispatchStore = useDispatch()
    const isLogged = useSelector(getIsLogged)
    const isEditMode = useSelector(selectEditMode)
    const user = useSelector(selectUser)
    const { firstName, userName } = user


    const handleLogOut = () => {
        dispatchStore(logout())
    }

   
    const renderLinksNav = () => {
            return (
                <ul>
                    {isLogged ? (
                        <>
                            <li>
                                <Link to='/profile' className='header__link'>
                                    <FontAwesomeIcon icon={faCircleUser} className='header__link__icon'/>
                                    {userName ? userName : firstName}
                                </Link>
                            </li>

                            {isEditMode && (
                                <li>
                                    <Link to='/profile' className='header__link'>
                                        <FontAwesomeIcon icon={faGear} className='header__link__icon' />
                                    </Link>
                                </li>
                             )
                            }

                            <li>
                                <Link to='/logout' className='header__link' onClick={handleLogOut}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className='header__link__icon' />
                                    {/* Log out */}
                                </Link>
                            </li>
                        </>

                    ) : (      
                            
                            <li>
                                <Link to='/login' className='header__link'>
                                    <FontAwesomeIcon icon={faCircleUser} className='header__link__icon' />
                                    Sign in
                                </Link>
                            </li>
                    )}
                </ul>
            )
    }

    return (
        <header className='header'>
            <Link to='/'>
                <h1 className='sr-only'>Argent Bank</h1>
                <img src={logo} alt='Argent Bank Logo' />
            </Link>
            <nav>
              {renderLinksNav()}
            </nav>
        </header>
    )
}

export default Header