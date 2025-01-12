import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth"
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const { registerUser, updateUserProfile, setUser,signinWithGoogle } = useAuth()

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // URL Verification
        const regexURL = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
        if (!regexURL.test(photo)) {
            return setErrorMessage('Invalid URL (use jpg/png/jpeg/webp/gif format)')
        }
        // Password Verification
        const regexPassword = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!regexPassword.test(password)) {
            return setErrorMessage("Password must be at least 6 characters long, Include one uppercase and one lowercase letter")
        }
        setErrorMessage('');
        registerUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        setUser({ displayName: name, photoURL: photo })
                    })
                e.target.reset()
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                })
                Toast.fire({
                    icon: "success",
                    title: "Registration successful"
                })
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                const errorMsg = error.message;
                setErrorMessage(errorMsg)
            })

    }
    const handleGoogleSignIn = () => {
        signinWithGoogle()
            .then(() => {
                navigate(location?.state ? location.state : '/')
            })
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 items-center my-8 lg:my-4 container mx-auto px-5">
            <div className="order-1 md:order-0 bg-indigo-100 mx-auto shadow-lg border-indigo-200 border rounded-lg md:max-w-[27rem]">
                <form onSubmit={handleRegister} className="md:px-8 p-5 pb-3 ">
                    <div className="space-y-4">
                        <h3 className="text-2xl  font-semibold text-indigo-500 text-center">Register Here...</h3>
                        <input type="text" name="name" placeholder="Your Name" className="input dark:text-gray-800 w-full input-bordered border-indigo-200 rounded-lg" required />
                        <input type="email" name="email" placeholder="Email Address" className="input w-full input-bordered border-indigo-200 dark:text-gray-800 rounded-lg" required />
                        <input type="url" name="photo" placeholder="Photo URL" className="input w-full input-bordered border-indigo-200 dark:text-gray-800 rounded-lg" required />
                        <input type='password' name="password" placeholder="Password" className="input w-full input-bordered border-indigo-200 dark:text-gray-800 rounded-lg" required />
                        <input type="submit" value='Register' className="btn bg-indigo-500 hover:bg-indigo-600 w-full text-white" />
                    </div>
                    <p className="text-gray-700 text-center pt-3 pb-3">Already have an account? <Link to="/login" className="link link-hover text-indigo-600 font-semibold">Login</Link></p>
                    <div className="divider divide-slate-700 -mt-2 text-gray-700 font-medium">or</div>
                    <Link onClick={handleGoogleSignIn} className="items-center dark:text-gray-800 text-center gap-1 md:gap-2 flex -mt-2 border border-indigo-300 text-sm md:text-[16px] rounded-full py-[8px] mx-auto font-medium  bg-indigo-200 hover:bg-indigo-300 transition-all justify-center w-3/4 lg:w-3/5"><FcGoogle className="text-xl md:text-2xl" /> Signin With Google</Link>
                </form>
                {
                    errorMessage && <p className="text-center px-7 pb-4 text-error">{errorMessage}</p>
                }
            </div>
            <div className="order-0 md:order-1">
                <Lottie animationData={registerAnimation} className="w-full lg:w-4/5" loop={true} />
            </div>
        </div>
    )
}

export default Register;