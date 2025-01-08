import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { loginUser, signinWithGoogle } = useAuth()

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setErrorMessage('');
        loginUser(email, password)
            .then(() => {
                e.target.reset()
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Logged In successfully"
                });
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 items-center my-8 lg:my-4 container mx-auto px-5">
            <div className="order-1 md:order-0 bg-indigo-100 mx-auto shadow-lg border-indigo-200 border rounded-lg md:max-w-[25rem] my-8">
                <form onSubmit={handleSignIn} className="px-5 md:px-8 py-3 md:py-5">
                    <div className="space-y-4">
                        <h3 className="text-2xl  font-semibold text-indigo-500 text-center">Log In</h3>
                        <input type="email" name="email" placeholder="Email" className="input w-full input-bordered border-indigo-200 dark:text-gray-800 rounded-lg" required />
                        <input type='password' name="password" placeholder="Password" className="input w-full input-bordered border-indigo-200 dark:text-gray-800 rounded-lg" required />
                        <input type="submit" value='Log In' className="btn bg-indigo-500 hover:bg-indigo-600 w-full text-white" />
                    </div>
                    <p className="text-gray-700 text-center pt-3 pb-4">Dont have any account? <Link to="/register" className="link link-hover text-indigo-600 font-medium">Register</Link></p>
                    <div className="divider divide-slate-700 -mt-2 text-gray-700 font-medium">or</div>
                    <Link onClick={handleGoogleSignIn} className="items-center dark:text-gray-800 text-center gap-1 md:gap-2 flex -mt-2 border border-indigo-300 text-sm md:text-[16px] rounded-full py-[8px] mx-auto font-medium  bg-indigo-200 hover:bg-indigo-300 transition-all justify-center w-3/4 lg:w-3/5"><FcGoogle className="text-xl md:text-2xl" /> Signin With Google</Link>
                </form>
                {
                    errorMessage && <h3 className="text-center px-7 pb-4 text-error -mt-1">{errorMessage}</h3>
                }
            </div>
            <div className="order-0 md:order-1">
                <Lottie animationData={loginAnimation} className="w-full lg:w-3/5" loop={true} />
            </div>
        </div>
    )
}

export default Login;