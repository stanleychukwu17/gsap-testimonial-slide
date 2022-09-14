import { motion } from 'framer-motion';
import { gsap } from 'gsap';

import ImgComp from '../Img/ImgComp';

import './app.scss';

// import the needed images
import slide1 from '../../assets/images/slide1.jpg'
import slide2 from '../../assets/images/slide2.jpg'
import slide3 from '../../assets/images/slide3.jpg'

// constants to be used inside the App component
import { slideProps } from '../../types/general.types';

const slides: slideProps[] = [
    {
        img: slide1,
        name: '',
        position: '',
        avatar: '',
        details: 'An amazing product'
    },
    {
        img: slide2,
        name: '',
        position: '',
        avatar: '',
        details: 'An amazing product'
    },
    {
        img: slide3,
        name: '',
        position: '',
        avatar: '',
        details: 'An amazing product'
    },
]
const App = () => {

    return (
        <div className="AppMain">
            {/* <div className="">for absolute items</div> */}
            <div className="">
                <div className="TopHdr"><h2>Testimonials</h2></div>
                <div className="slidesSection">
                    <div className="">
                        <div className="ImgParOvr">
                            {slides.map((item: slideProps, index: number) => {
                                return <ImgComp key={index} {...item} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default App;