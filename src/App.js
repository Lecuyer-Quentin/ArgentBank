import Layout from "./components/Layout"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RequireAuth from "./features/form/RequireAuth"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import { useEffect } from "react"
import { setToken, getIsLogged, logout } from "./app/loginSlice"
import "./assets/sass/main.scss"


function App() {
  const dispatch = useDispatch()
  const isLogged = useSelector(getIsLogged)

  useEffect(() => {
    // Check if user is logged in on page load and logout if not
    if (!isLogged) {
      dispatch(logout())
    }
  // Check if token exists in local storage
  // If it does, set token in redux store and fetch user profile
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(setToken(token))
      // dispatch(fetchUserProfile())
    }
  }, [dispatch, isLogged])


  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>

     
  );
}

export default App;
