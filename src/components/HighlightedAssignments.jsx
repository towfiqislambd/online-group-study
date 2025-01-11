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
        <div className="container mx-auto px-5 grid grid-cols-3 gap-5 my-16">
            {
                slicedAssignments.map(assignment => <Highlightes key={assignment._id} assignment={assignment}></Highlightes>)
            }
        </div>
    )
}

export default HighlightedAssignments;