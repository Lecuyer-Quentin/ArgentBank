import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser,selectEditMode, editMode, fetchUserProfile} from '../../app/profileSlice'
import { getIsLogged, getToken } from '../../app/loginSlice'
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import EditForm from './EditForm'

const ProfileBanner = () => {
  // const navigate = useNavigate()
  const user = useSelector(selectUser)
  const dispatchStore = useDispatch()
  const isLogged = useSelector(getIsLogged)
  const token = useSelector(getToken)
  const isEditMode = useSelector(selectEditMode)
  const { firstName, userName } = user
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!dataLoaded) {
      dispatchStore(fetchUserProfile(token))
      setDataLoaded(true)
    }
  }, [dispatchStore, token, dataLoaded])

  const handleEditMode = () => {
    dispatchStore(editMode())
  }

  const renderEditButton = () => {
      return (
        <button className="profile__editButton" onClick={handleEditMode}>
          Edit Name
        </button>
      )         
  }
 
  const renderBanner = () => {
      return (
        <div className="profile__banner">
          <h2>Welcome back <br/> {firstName} {userName} !</h2>        
          {renderEditButton()}
        </div>
      )
  }
        
  return (
    <>
      {isLogged && !isEditMode && renderBanner()}
      {isLogged && isEditMode && <EditForm />}      
    </>
  )
}

export default ProfileBanner
  
