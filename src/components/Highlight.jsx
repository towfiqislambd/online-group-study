import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Highlight = ({ assignment }) => {
    const { title, thumbnail, description, marks, date } = assignment;
    return (
        <div className="border border-gray-300 bg-indigo-50 dark:bg-transparent dark:border-gray-700 rounded hover:-translate-y-2 shadow duration-1000 ">
            <div className="overflow-hidden rounded-t">
                <img src={thumbnail} className="w-full dark:border dark:border-gray-800 h-56 transform hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="p-6">
                <p className="text-xl font-semibold mb-2">{title}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{description.substring(0, 80)}...</p>
                <div className="flex items-center justify-between mb-4">
                    <p className="font-medium dark:text-gray-400 text-gray-600"><span className="text-gray-700 font-medium dark:text-gray-400">Marks:</span> {marks}</p>
                    <p className="px-4 dark:text-gray-800 font-medium cursor-pointer py-2 rounded-full text-xs bg-indigo-200 dark:bg-gray-400">{date}</p>
                </div>
                <Link to='/assignments' className="bg-indigo-500 border-2 border-indigo-500 px-[16px] py-[6px] text-gray-100 duration-500 font-medium tracking-wide rounded hover:bg-transparent hover:text-indigo-600">View More <FaArrowRightLong className="inline"/></Link>
            </div>
        </div>
    )
}

export default Highlight;