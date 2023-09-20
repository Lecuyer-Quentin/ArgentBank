import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, editMode, fetchUserProfile} from '../profile/profileSlice'
import { getIsLogged, getToken } from '../form/loginSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProfileBanner = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const dispatchStore = useDispatch()
  const isLogged = useSelector(getIsLogged)
  const token = useSelector(getToken)
  const { firstName, lastName, userName } = user
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!dataLoaded) {
      dispatchStore(fetchUserProfile(token))
      setDataLoaded(true)
    }
  }, [dispatchStore, token, dataLoaded])

  const handleEditMode = () => {
    navigate('/edit')
    dispatchStore(editMode())
  }

  const renderEditButton = () => {
      return (
        <button className="profile__editbutton" onClick={handleEditMode}>
          <i className="fa fa-pencil fa-fw fa-lg"></i>
          Edit Profile
        </button>
      )         
  }
  
 
  const renderBanner = () => {
      return (
        <div className="profile__banner">
          <h2>Welcome back <br/> {firstName} {lastName} !</h2>
          <p>{userName}</p>         
          {renderEditButton()}
        </div>
      )
  }
        
  return (
    <>
      {isLogged && renderBanner()}
    </>
  )
}

export default ProfileBanner
  
