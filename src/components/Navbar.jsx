import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.png"
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { MdLogin } from "react-icons/md";
import ThemeController from "./ThemeController";

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    return (
        <nav className="shadow-lg sticky top-0 z-40 bg-indigo-100">
            <div className="navbar container mx-auto px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden me-3">
                            <FaBars className="text-3xl dark:text-gray-800" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-lg px-4 py-5 z-[1] mt-3 w-52 p-2 space-y-1 dark:text-gray-800 shadow font-medium">
                            <li><NavLink to='/' className='rounded'>Home</NavLink></li>
                            <li><NavLink to='/assignments' className='rounded'>Assignments</NavLink></li>
                            {
                                user && <li><NavLink to='/pending-assignments' className='rounded'>Pending Assignments</NavLink></li>
                            }
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-12 h-12 md:w-14 md:h-14" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-black px-1 font-medium">
                        <li><NavLink to='/' className='rounded'>Home</NavLink></li>
                        <li><NavLink to='/assignments' className='rounded'>Assignments</NavLink></li>
                        {
                            user && <li><NavLink to='/pending-assignments' className='rounded'>Pending Assignments</NavLink></li>
                        }
                    </ul>
                </div>
                <div className="navbar-end flex gap-2 items-center">
                    <ThemeController></ThemeController>
                    {
                        user ? <div className="flex gap-2 md:gap-3 items-center">
                            <Link to='/login' onClick={signOutUser} className="bg-[#6366F1] px-3 md:px-4 py-[6px] md:py-2 text-white rounded font-medium">Logout</Link>
                            <div className="dropdown dropdown-end z-10">
                                <div className="tooltip flex items-center tooltip-bottom" data-tip={user?.displayName}>
                                    <img referrerPolicy="no-referrer" src={user?.photoURL} alt="Profile" tabIndex={0} role="button" className="w-[2.7rem] h-[2.7rem] border rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content font-medium space-y-2 border mt-3  menu bg-base-100 rounded-lg z-[1] w-56 py-5 shadow">
                                    <Link to='/create-assignment' className="hover:text-white dark:text-gray-800 hover:bg-indigo-500 py-1 px-3 rounded transition-all">Create Assignment</Link>
                                    <Link to='/my-Submitted-assignments' className="hover:text-white hover:bg-indigo-500 py-1 px-3 rounded dark:text-gray-800 transition-all">My Submitted Assignments</Link>
                                </ul>
                            </div>
                        </div> :
                            <Link to='/login' className="bg-[#6366F1] px-4 flex gap-1 items-center py-2 text-white rounded font-medium">Login <MdLogin /></Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;