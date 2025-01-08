import { IoIosPeople } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdWifiProtectedSetup } from "react-icons/md";
import { MdSupport } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { RiApps2AiFill } from "react-icons/ri";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration: 1000
})

const Feathers = () => {
    return (
        <div className="container mx-auto px-5 my-14">
            <div className="text-center mb-10">
                <h2 className="md:text-4xl text-3xl dark:text-white font-bold font-mono text-gray-800 mb-4">Some Of Our Feathers</h2>
                <p className="lg:w-1/2 md:w-2/3 mx-auto dark:text-gray-400 text-gray-600">There are many people which includes homeless, disaster victims, underprivileged and children in need of clothing. We cannot do so much for them but try</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-7">
                <div data-aos="flip-left" className="p-5 rounded-lg space-y-4 text-center bg-indigo-100 border-[2px] border-indigo-400">
                    <IoIosPeople className="text-7xl mx-auto rounded-full p-3 text-white bg-indigo-400 " />
                    <h4 className="text-2xl dark:text-gray-800 font-bold mb-2">Growing Community</h4>
                    <p className="text-gray-500 pb-2">After cleaning and organizing our closet, in the end we are probably wondering what we are going to do with clothes that we no longer are going to wear; perhaps they are too worn out or they don’t fit as well anymore</p>
                    <button className="underline font-medium text-gray-700">Read More</button>
                </div>
                <div data-aos="flip-left" className="p-5 rounded-lg space-y-4 text-center bg-indigo-100 border-[2px] border-indigo-400 transition-all">
                    <MdWifiProtectedSetup className="text-7xl mx-auto rounded-full p-3 text-white bg-indigo-400 " />
                    <h4 className="text-2xl dark:text-gray-800 font-bold mb-2">Setup Team</h4>
                    <p className="text-gray-500 pb-2">Distinctively parallel task magnetic deliverables whereas 2.0 action items. Completely repurpose installed base results whereas user-centric metrics. Dramatically communicate goal-oriented bandwidth with low-risk.</p>
                    <button className="underline font-medium text-gray-700">Read More</button>
                </div>
                <div data-aos="flip-left" className="p-5 rounded-lg space-y-4 text-center bg-indigo-100 border-[2px] border-indigo-400 transition-all">
                    <BiSolidDonateHeart className="text-7xl mx-auto rounded-full p-3 text-white bg-indigo-400 " />
                    <h4 className="text-2xl dark:text-gray-800 font-bold mb-2">1000+ Students</h4>
                    <p className="text-gray-500 pb-2">Dynamically incentivize turnkey platforms vis-a-vis 24/365 initiatives. Quickly enable interoperable information with bricks-and-clicks testing procedures. Enthusiastically innovate standards compliant e-tailers.</p>
                    <button className="underline font-medium text-gray-700">Read More</button>
                </div>
                <div data-aos="flip-right" className="p-5 rounded-lg space-y-4 text-center bg-indigo-100 border-[2px] border-indigo-400 transition-all">
                    <MdSupport className="text-7xl mx-auto rounded-full p-3 text-white bg-indigo-400 " />
                    <h4 className="text-2xl dark:text-gray-800 font-bold mb-2">Dedicated Support</h4>
                    <p className="text-gray-500 pb-2">After cleaning and organizing our closet, in the end we are probably wondering what we are going to do with clothes that we no longer are going to wear; perhaps they are too worn out or they don’t fit as well anymore</p>
                    <button className="underline font-medium text-gray-700">Read More</button>
                </div>
                <div data-aos="flip-right" className="p-5 rounded-lg space-y-4 text-center bg-indigo-100 border-[2px] border-indigo-400 transition-all">
                    <RiFeedbackLine className="text-7xl mx-auto rounded-full p-3 text-white bg-indigo-400 " />
                    <h4 className="text-2xl dark:text-gray-800 font-bold mb-2">Assignments Feedback</h4>
                    <p className="text-gray-500 pb-2">Dynamically incentivize turnkey platforms vis-a-vis 24/365 initiatives. Quickly enable interoperable information with bricks-and-clicks testing procedures. Enthusiastically innovate standards compliant e-tailers vis-a-vis.</p>
                    <button className="underline font-medium text-gray-700">Read More</button>
                </div>
                <div data-aos="flip-right" className="p-5 rounded-lg space-y-4 text-center bg-indigo-100 border-[2px] border-indigo-400 transition-all">
                    <RiApps2AiFill className="text-7xl mx-auto rounded-full p-3 text-white bg-indigo-400 " />
                    <h4 className="text-2xl dark:text-gray-800 font-bold mb-2">Available Android Apps</h4>
                    <p className="text-gray-500 pb-2">After cleaning and organizing our closet, in the end we are probably wondering what we are going to do with clothes that we no longer are going to wear; perhaps they are too worn out or they don’t fit as well anymore</p>
                    <button className="underline font-medium text-gray-700">Read More</button>
                </div>
            </div>
        </div>
    )
}

export default Feathers;