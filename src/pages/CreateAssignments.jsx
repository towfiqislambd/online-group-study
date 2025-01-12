import { useState } from 'react'
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const CreateAssignments = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [marksError, setMarksError] = useState('');
    const [thumbnailError, setThumbnailError] = useState('');
    const [levelError, setLevelError] = useState('');

    const handleCreateAssignment = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        // Validate The Form
        setMarksError('')
        setThumbnailError('')
        setLevelError('')
        if (initialData.marks <= 0) {
            return setMarksError('Marks must be a positive number')
        }
        const regexURL = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
        if (!regexURL.test(initialData.thumbnail)) {
            return setThumbnailError('Invalid URL (use jpg/png/jpeg/webp/gif format)')
        }
        if (!initialData.difficulty_level || initialData.difficulty_level === 'defOption') {
            return setLevelError('Select Difficulty Level')
        }
        const finalData = {
            ...initialData,
            marks: Number(initialData.marks),
            email: user?.email
        }
        axiosSecure.post('/all-assignments', finalData)
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Assignment Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/assignments')
            })
    }
    return (
        <div className="container mx-auto px-5 sm:px-10">
            <div className="bg-indigo-50 dark:bg-transparent mx-auto shadow-xl border border-indigo-100 rounded-lg my-8 max-w-3xl">
                <form onSubmit={handleCreateAssignment} className="p-4 sm:p-8 space-y-3 sm:space-y-5 dark:bg-transparent bg-gray-200 border">
                    <h3 className="text-2xl sm:text-3xl font-bold text-indigo-500 text-center">Create Assignment...</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <input type="text" name="title" placeholder="Assignment Title" className="input dark:text-gray-700 col-span-2 dark:bg-gray-100 sm:col-span-1 bg-white w-full input-bordered border-gray-300 rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 transition" required />
                        <div className='col-span-2 sm:col-span-1'>
                            <input type="number" name="marks" placeholder="Marks" className="input dark:text-gray-700 bg-white  dark:bg-gray-100 w-full input-bordered border-gray-300 rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 transition" required />
                            {
                                marksError && <p className='mt-1 text-error'>{marksError}</p>
                            }
                        </div>
                        <div className='col-span-2 sm:col-span-1'>
                            <input type="url" name="thumbnail" placeholder="Thumbnail Image URL" className="input bg-white w-full  dark:bg-gray-100 dark:text-gray-700 input-bordered border-gray-300 rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 transition" required />
                            {
                                thumbnailError && <p className='mt-1 text-error'>{thumbnailError}</p>
                            }
                        </div>
                        <div className="w-full input dark:bg-gray-100 input-bordered pt-3">
                            <DatePicker name="date" className="w-full dark:text-gray-700 text-gray-400" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className='col-span-2'>
                            <select name='difficulty_level' defaultValue='defOption' className="select bg-white w-full border-gray-300 rounded-md dark:bg-gray-100 shadow-sm dark:text-gray-700 focus:border-indigo-400 focus:ring focus:ring-indigo-200 text-gray-400 transition" required >
                                <option value='defOption' disabled>Assignment Difficulty Level</option>
                                <option value='Easy'>Easy</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hard'>Hard</option>
                            </select>
                            {
                                levelError && <p className='mt-1 text-error'>{levelError}</p>
                            }
                        </div>
                    </div>
                    <textarea name="description" rows={5} className="textarea dark:bg-gray-100 dark:text-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 transition"
                        placeholder="Description...." required></textarea>
                    <button type="submit" className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 shadow-md transition">Create Assignment</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAssignments;