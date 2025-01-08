import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null)
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase.init"
const googleProvider = new GoogleAuthProvider();
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signinWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            // JWT Configurations
            if (currentUser?.email) {
                const user = { email: currentUser?.email }
                axios.post('https://online-group-study-theta.vercel.app/login', user, { withCredentials: true })
                    .then(() => {
                        setLoading(false)
                    })
            }
            else {
                axios.post('https://online-group-study-theta.vercel.app/logout', {}, { withCredentials: true })
                    .then(() => {
                        setLoading(false)
                    })
            }
        })
        return () => unSubscribe()
    }, [])

    const authInfo = {
        registerUser,
        loginUser,
        signinWithGoogle,
        signOutUser,
        updateUserProfile,
        setUser,
        loading,
        user,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;