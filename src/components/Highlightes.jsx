import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";

const Highlightes = ({ assignment }) => {
    const { _id, title, thumbnail, description, marks, date, difficulty_level, email } = assignment;
    return (
        <div className="border-2 p-6 rounded-lg border-gray-200 hover:-translate-y-2 shadow hover:border-2 hover:border-indigo-400 duration-500">
            <div className="overflow-hidden rounded-lg mb-3">
                <img src={thumbnail} className="w-full dark:border dark:border-gray-800 h-52 rounded-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-2">{description.substring(0, 65)}...</p>
            <p className="mb-1"><span className="text-gray-700 font-medium dark:text-gray-400">Difficulty Level:</span> <span className="font-medium text-gray-600 dark:text-gray-500">{difficulty_level}</span></p>
            <div className="flex items-center justify-between mb-3">
                <p className="font-medium dark:text-gray-500 text-gray-600"><span className="text-gray-700 font-medium dark:text-gray-400">Marks:</span> {marks}</p>
                <p className="px-4 dark:text-gray-600 font-medium cursor-pointer py-2 rounded-full text-xs bg-indigo-200">{date}</p>
            </div>
            <div className="flex items-center gap-4">
                <Link to={`/assignmentDetails/${_id}`} className="bg-indigo-500 w-12 h-8 grid place-items-center rounded transform hover:scale-110 transition-transform duration-300"><IoEye className="text-xl text-gray-200" /></Link>
            </div>
        </div>
    )
}

export default Highlightes;