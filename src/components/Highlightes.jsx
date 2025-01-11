import { Link } from "react-router-dom";

const Highlightes = ({ assignment }) => {
    const { _id, title, thumbnail, description, marks, date, difficulty_level, email } = assignment;
    return (
        <div className="border border-gray-700 p-6 rounded-lg hover:-translate-y-2 shadow hover:border-2 hover:border-indigo-400 duration-1000 ">
            <div className="overflow-hidden rounded-lg mb-5">
                <img src={thumbnail} className="w-full dark:border dark:border-gray-800 h-52 rounded-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-xl font-semibold mb-2">{title}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{description.substring(0, 80)}...</p>
            <div className="flex items-center justify-between mb-4">
                <p className="font-medium dark:text-gray-500 text-gray-600"><span className="text-gray-700 font-medium dark:text-gray-400">Marks:</span> {marks}</p>
                <p className="px-4 dark:text-gray-800 font-medium cursor-pointer py-2 rounded-full text-xs bg-indigo-200 dark:bg-gray-400">{date}</p>
            </div>
            <Link to={`/assignmentDetails/${_id}`} className="bg-indigo-500 border-2 border-indigo-500 px-4 py-1 text-gray-100 duration-500 rounded hover:bg-transparent hover:text-indigo-600">View More</Link>
        </div>
    )
}

export default Highlightes;