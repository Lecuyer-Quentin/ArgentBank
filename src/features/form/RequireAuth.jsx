import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getStatus } from '../form/loginSlice'
// import { getIsLogged } from '../form/loginSlice'
import { getToken } from '../form/loginSlice'

const RequireAuth = () => {

  const status = useSelector(getStatus)
  // const isLogged = useSelector(getIsLogged)
  const token = useSelector(getToken)


  const render = () => {
    return (
      status === 'succeeded' && token ? (
        <Outlet />
      ) : (
          <Navigate to="/login"/>
        )
    )

  }

  
  return (
    <div>
      {render()}
    </div>  
  )
}

export default RequireAuth