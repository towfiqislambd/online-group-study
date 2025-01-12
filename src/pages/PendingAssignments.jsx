import { useState, useEffect } from "react";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2'

const PendingAssignments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignments, setSelectedAssignments] = useState({});
    useEffect(() => {
        axiosSecure.get(`/my-submitted-assignments`)
            .then(data => {
                setAssignments(data.data)
            })
    }, [])

    const handleGiveMarkBtn = assignment => {
        if (user.email === assignment.email) {
            return Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Sorry, You can't Give Mark",
                showConfirmButton: false,
                timer: 1500
            });
        }
        document.getElementById('my_modal_5').showModal();
        setSelectedAssignments(assignment);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const obtained_marks = e.target.obtained_marks.value;
        const feedback = e.target.feedback.value;
        const data = {
            obtained_marks,
            feedback,
            status: 'Completed',
            id: selectedAssignments._id,
            userEmail: selectedAssignments.email
        };
        axiosSecure.patch(`/submitted-assignments/${data.id}`, data)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Marks Distribution Complete",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    document.getElementById('my_modal_5').close();
                    const remainingAssignments = assignments.filter(assignment => selectedAssignments._id !== assignment._id);
                    setAssignments(remainingAssignments)
                }
            })
    }

    return (
        <div className="container mx-auto px-3 lg:px-5 my-10">
            {
                assignments.length === 0 ? (
                    <h2 className="text-center text-3xl flex justify-center items-center h-[65vh] text-red-500 font-semibold">No Assignment Found!!!</h2>
                ) : <div className="overflow-auto h-[450px] md:h-auto border border-gray-300 rounded-lg shadow-lg">
                    <table className="table w-full xl:table-lg border-collapse">
                        <thead className="bg-gradient-to-r from-indigo-600 text-[15px] to-indigo-800 text-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left border border-gray-300">ID</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Examinee Name</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Assignment Title</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Assignment Marks</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Status</th>
                                <th className="py-3 px-4 text-left border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                assignments.map((assignment, idx) => (
                                    <tr key={assignment._id} className={`hover:bg-purple-50 dark:bg-gray-950 transition-all ${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                        <th className="py-3 dark:text-gray-200 px-4 border border-gray-300">{idx + 1}</th>
                                        <td className="py-3 px-4 border border-gray-300 dark:text-gray-400">{assignment.examinee_name}</td>
                                        <td className="py-3 px-4 border dark:text-gray-400 border-gray-300">{assignment.title}</td>
                                        <td className="py-3 px-4 text-purple-600 font-medium border border-gray-300">{assignment.assignment_marks}</td>
                                        <td className="py-3 px-4 text-yellow-600 font-medium border border-gray-300">{assignment.status}</td>
                                        <td className="py-3 px-4 border border-gray-300">
                                            <button onClick={() => handleGiveMarkBtn(assignment)} className="bg-indigo-300 transition-all rounded-full hover:bg-indigo-200 border px-1 lg:px-3 py-[0.17rem] lg:py-1 font-medium text-xs lg:text-sm text-indigo-700 hover:border-indigo-700 hidden lg:inline-block">Give Mark</button>
                                            <button onClick={() => handleGiveMarkBtn(assignment)} className="bg-indigo-300 transition-all rounded-full hover:bg-indigo-200 border px-2 lg:px-3 py-[0.17rem] lg:py-1 font-medium text-xs lg:text-sm text-indigo-700 hover:border-indigo-700 lg:hidden">Mark</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {
                        selectedAssignments && <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box bg-indigo-100">
                                <h3 className="font-bold mb-2 text-lg dark:text-gray-800">Assignment Marks Distribution:</h3>
                                <form method="dialog">
                                    <button className="btn dark:text-gray-900 btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <form onSubmit={handleSubmit}>
                                    <input type="url" defaultValue={selectedAssignments.googleDoc} className='input dark:text-gray-700 hover:underline hover:text-blue-600 rounded mb-2 w-full input-bordered' name='googleDoc' required
                                        onClick={(e) => {
                                            const url = e.target.defaultValue;
                                            if (url) {
                                                const anchor = document.createElement('a');
                                                anchor.href = url;
                                                anchor.target = '_blank';
                                                anchor.click();
                                            }
                                        }} />
                                    <textarea defaultValue={selectedAssignments.note} name="note" className='textarea textarea-bordered dark:text-gray-700 rounded w-full' rows={3}></textarea>
                                    <input name="obtained_marks" type="number" placeholder="Marks" className="input input-bordered dark:text-gray-700 mb-2 w-full rounded" required />
                                    <textarea name="feedback" className='textarea  textarea-bordered rounded w-full dark:text-gray-700' placeholder="Write Feedback...." rows={3} required></textarea>
                                    <input type="submit" value='Submit' className="btn mb-2 w-full block bg-indigo-500 hover:bg-indigo-600 text-white" />
                                </form>
                            </div>
                        </dialog>
                    }
                </div>
            }
        </div>
    )
}

export default PendingAssignments;