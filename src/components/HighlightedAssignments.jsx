import axios from "axios"
import { useEffect, useState } from "react"
import Highlightes from "./Highlightes";

const HighlightedAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const slicedAssignments = assignments.slice(0, 3)
    useEffect(() => {
        axios.get('https://online-group-study-theta.vercel.app/all-assignments')
            .then(data => {
                setAssignments(data.data)
            })
    }, [])
    return (
        <div className="container mx-auto px-5 mt-16 mb-20">
            <div className="text-center mb-12">
                <h2 className="md:text-4xl text-3xl dark:text-white font-semibold text-gray-800 mb-4">Highlighted Assignments</h2>
                <p className="lg:w-1/2 md:w-2/3 mx-auto dark:text-gray-400 text-gray-600">There are many people which includes homeless, disaster victims, underprivileged and children in need of clothing. We cannot do so much for them but try</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {
                    slicedAssignments.map(assignment => <Highlightes key={assignment._id} assignment={assignment}></Highlightes>)
                }
            </div>
        </div>
    )
}

export default HighlightedAssignments;