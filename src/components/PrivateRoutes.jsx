import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth'

const PrivateRoutes = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth()
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-bars loading-lg"></span></div>
    }
    if (user) {
        return children
    }
    return (
        <div>
            <Navigate state={location?.pathname} to='/login'></Navigate>
        </div>
    )
}

export default PrivateRoutes;