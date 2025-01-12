import { useState, useEffect } from "react";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const MyAttemptedAssignments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/my-submitted-assignments/${user?.email}`)
            .then(data => {
                setAssignments(data.data)
            })
    }, [])

    return (
        <div className="container mx-auto px-5 xl:px-28 my-10">
            {assignments.length === 0 ? (
                <h2 className="text-center text-3xl flex justify-center items-center h-[65vh] text-red-500 font-semibold">You did not submit any Assignment yet!!!</h2>
            ) : (
                <div className="overflow-auto h-96 md:h-auto border-2 rounded-lg shadow-lg border-gray-400">
                    <table className="table-auto w-full border-collapse border-spacing-0">
                        <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left border border-gray-300">ID</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Title</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Assignment Marks</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Obtained Marks</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Assignment Feedback</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, idx) => (
                                <tr key={assignment._id} className={`hover:bg-gray-100 dark:bg-gray-950 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                    <th className="py-3 px-4 border dark:text-gray-200 border-gray-300">{idx + 1}</th>
                                    <td className="py-3 px-4 border border-gray-300 dark:text-gray-300">{assignment.title}</td>
                                    <td className="py-3 px-4 border border-gray-300 dark:text-gray-300">{assignment.assignment_marks}</td>
                                    <td className="py-3 px-4 border border-gray-300 dark:text-gray-300">{assignment.obtained_marks || <span className="text-error">upcoming</span>}</td>
                                    <td className="py-3 px-4 border border-gray-300 dark:text-gray-300">{assignment.feedback || <span className="text-error">upcoming</span>}</td>
                                    <td className={`py-3 font-medium px-4 border border-gray-300 ${assignment.status === 'Pending' && 'dark:text-yellow-500 text-yellow-600' || 'text-green-500'}`}>{assignment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default MyAttemptedAssignments;