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
        <div className="bg-slate-100">
            {
                assignment && <div className="container mx-auto my-10 px-5 lg:px-32 xl:px-40">
                    <div className="border bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-5">
                        <img src={assignment.thumbnail} className="w-full h-full sm:h-96 rounded" />
                        <div className="">
                            <p className="text-2xl text-gray-800 font-medium mb-3">{assignment.title}</p>
                            <p className="text-gray-600 mb-2">{assignment.description}</p>
                            <p className="text-gray-700 font-medium mb-1">Difficulty Level: <span className="font-normal">{assignment.difficulty_level}</span></p>
                            <p className="font-medium text-gray-700 mb-1">Marks: <span className="font-normal">{assignment.marks}</span></p>
                            <p className="text-gray-700 font-medium text-base mb-4">Date: <span className="font-normal">{assignment.date}</span></p>
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