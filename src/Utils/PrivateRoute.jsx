import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export const PrivateRoute = () => {
  const {auth} = useAuth()
  return auth.loggedInToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}
