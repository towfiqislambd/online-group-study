import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const AssignmentDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [assignment, setAssignment] = useState(null);
    useEffect(() => {
        axiosSecure.get(`/assignmentDetails/${id}`)
            .then(data => {
                setAssignment(data.data)
            })
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        const googleDoc = e.target.googleDoc.value;
        const note = e.target.note.value;
        const data = {
            email: user.email,
            examinee_name: user?.displayName,
            title: assignment.title,
            assignment_marks: assignment.marks,
            status: 'Pending',
            googleDoc,
            note,
            assignment_id: assignment._id
        }
        axiosSecure.post('/completed-assignments', data)
            .then(res => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Submission Complete",
                    showConfirmButton: false,
                    timer: 1500
                });
                return axiosSecure.post('/submitted-assignments', { id: res.data.insertedId, ...data })
            })
            .catch(err => {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: err.response.data,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        document.getElementById('my_modal_5').close();
    }
    return (
        <div className="container mx-auto px-5">
            {
                assignment && <div className="lg:px-52">
                    <div className="border space-y-4 sm:grid grid-cols-12 gap-4 sm:gap-7 items-center p-4 md:p-6 rounded-lg border-gray-300 shadow my-10">
                        <img src={assignment.thumbnail} className="w-full h-40 md:h-56 rounded-lg col-span-4" />
                        <div className="col-span-8">
                            <h3 className="md:text-lg font-semibold mb-1 sm:mb-2">{assignment.title}</h3>
                            <p className="text-gray-500 text-sm sm:text-base mb-1 sm:mb-2">{assignment.description}</p>
                            <p><span className="text-gray-700 dark:text-gray-400 font-medium">Difficulty Level:</span> <span className="font-medium dark:text-gray-500 text-gray-600">{assignment.difficulty_level}</span></p>
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-gray-600 dark:text-gray-500"><span className="text-gray-700 font-medium dark:text-gray-400">Marks:</span> {assignment.marks}</p>
                                <p className="px-4 dark:text-gray-700 font-medium cursor-pointer py-2 rounded-full text-xs bg-indigo-200">{assignment.date}</p>
                            </div>
                            <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-indigo-600 transition-all hover:bg-transparent border border-indigo-600 hover:text-indigo-600 text-white px-3 py-1 md:px-5 md:py-[7px] rounded font-medium text-xs md:text-sm">Take assignment</button>
                        </div>
                    </div>
                </div>
            }

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-indigo-100">
                    <h3 className="font-bold mb-2 text-lg dark:text-gray-800">Assignment Submission:</h3>
                    <form method="dialog">
                        <button className="btn text-black btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit}>
                        <input type="url" placeholder='Google Docs Link' className='input dark:text-gray-700 rounded mb-3 w-full input-bordered' name='googleDoc' required />
                        <textarea name="note" placeholder="Note (Optional)" className='textarea textarea-bordered mb-1 dark:text-gray-700 rounded w-full' rows={5}></textarea>
                        <input type="submit" value='Submit Assignment' className="btn hover:bg-indigo-800 w-full block bg-indigo-600 text-gray-100 hover:text-white transition" />
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default AssignmentDetails;