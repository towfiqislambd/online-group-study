import Feathers from '../components/Feathers';
import HighlightedAssignments from '../components/HighlightedAssignments';
import Slider from '../components/Slider'
import Testimonial from '../components/Testimonial'
const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <HighlightedAssignments></HighlightedAssignments>
            <Testimonial></Testimonial>
            <Feathers></Feathers>
        </div>
    )
}

export default Home;