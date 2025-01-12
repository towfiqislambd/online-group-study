import Assignment from "../components/Assignment";
import axios from "axios";
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useAxiosSecure from '../hooks/useAxiosSecure';
const Assignments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [filteredData, setFilteredData] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');


    // Pagination Config
    const [totalAssignment, setTotalAssignment] = useState(null)
    useEffect(() => {
        axios.get('https://online-group-study-theta.vercel.app/totalAssignments')
            .then(data => {
                const { assignments } = data.data
                setTotalAssignment(assignments)
            })
    }, [])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const numberOfPages = Math.ceil(totalAssignment / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]
    const handlePrevPage = e => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        axios.get(`https://online-group-study-theta.vercel.app/all-assignments?filteredData=${filteredData}&search=${search}&page=${currentPage}&size=${itemsPerPage}&sort=${sort}`)
            .then(data => {
                setAssignments(data.data)
            })
    }, [filteredData, search, currentPage, itemsPerPage, sort])

    const handleReset = () => {
        setFilteredData('')
        setSearch('')
        setSort('')
    }

    const handleDelete = (_id, email) => {
        if (user?.email !== email) {
            return Swal.fire({
                position: "top-center",
                icon: "error",
                title: "You don't have permission to delete the assignment!!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        axiosSecure.delete(`/all-assignments/${_id}`)
                            .then(data => {
                                if (data.data.deletedCount > 0) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    const remainingAssignments = assignments.filter(assignment => assignment._id !== _id);
                                    setAssignments(remainingAssignments)
                                }
                            })
                    }
                })
        }
    }
    return (
        <div className="container mx-auto px-5 mb-10 mt-8">
            <div className="mb-10 flex flex-wrap justify-center items-center gap-3 lg:gap-5">
                <select value={filteredData ? filteredData : 'defOption'} onChange={e => setFilteredData(e.target.value)} className="select select-bordered dark:bg-gray-200 text-gray-700">
                    <option value='defOption' disabled>Filter By Difficulty Level</option>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                </select>
                <div className="relative w-80">
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search Here..." className="input dark:text-gray-900 dark:bg-gray-200 input-bordered w-full" />
                    <IoSearchOutline className="text-2xl dark:text-gray-800 absolute top-3 right-3" />
                </div>
                <select value={sort ? sort : 'defOption'} onChange={e => setSort(e.target.value)} className="select select-bordered dark:bg-gray-200 text-gray-700">
                    <option value='defOption' disabled>Sort By Marks</option>
                    <option value='asc'>Ascending</option>
                    <option value='dsc'>Descending</option>
                </select>
                <button onClick={handleReset} type="button" className="px-5 font-medium py-[0.7rem] dark:bg-indigo-700 bg-gray-800 text-gray-100 rounded-lg">Reset</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
                {
                    assignments.map(assignment => <Assignment key={assignment._id} handleDelete={handleDelete} assignment={assignment}></Assignment>)
                }
            </div>
            <div className="pagination">
                <button id='prevBtn' onClick={handlePrevPage} className="dark:text-gray-800">Prev</button>
                {
                    pages.map(page => <button className={currentPage === page ? 'active' : ''} onClick={() => setCurrentPage(page)} key={page}>{page}</button>)
                }
                <button onClick={handleNextPage} className="dark:text-gray-800">Next</button>
            </div>
        </div>
    )
}

export default Assignments;