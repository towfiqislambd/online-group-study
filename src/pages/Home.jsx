import Feathers from '../components/Feathers';
import HighlightedAssignments from '../components/HighlightedAssignments';
import Slider from '../components/Slider'
const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <HighlightedAssignments></HighlightedAssignments>
            <Feathers></Feathers>
        </div>
    )
}

export default Home;