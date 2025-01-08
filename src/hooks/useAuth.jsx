import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}
export default useAuth