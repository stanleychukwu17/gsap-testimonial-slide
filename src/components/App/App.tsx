import { gsap } from 'gsap';
import { useCallback, useEffect, useRef } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

// importing of sub-components
import ImgComp from '../Img/ImgComp';
import DtsComp from '../Dts/DtsComp';

// importing of stylesheets
import './app.scss';

// import the needed images
import slide1 from '../../assets/images/slide1.jpg'
import slide2 from '../../assets/images/slide2.jpg'
import slide3 from '../../assets/images/slide3.jpg'
import building from '../../assets/svg/b1.svg'
import main_bg from '../../assets/svg/mbg.svg'
import cp1 from '../../assets/svg/cp1.svg'

// constants to be used inside the App component
import { slideProps } from '../../types/general.types';


const slides: slideProps[] = [
    {
        img: slide1,
        name: 'Henry Danger',
        position: 'C.E.O StickerMule',
        avatar: `${require('../../assets/avatar/av1.jpg')}`,
    },
    {
        img: slide2,
        name: 'Wayne Rooney',
        position: 'Driver @ Stimulus',
        avatar: `${require('../../assets/avatar/av2.jpg')}`,
    },
    {
        img: slide3,
        name: 'Paul Peter',
        position: 'Fashion Designer, StickerMule',
        avatar: `${require('../../assets/avatar/av3.jpg')}`,
    },
]
const App = () => {
    const currentSlide = useRef<number>(1)
    const zzIndex = useRef<number>(0)

    const backward = useCallback(() => {
        currentSlide.current--
        if (currentSlide.current < 1) { currentSlide.current = slides.length; }

        gsap.fromTo(`.img${currentSlide.current}`, {left:-400, scale:1.2, zIndex:++zzIndex.current}, {left:0, scale:1, duration:1})
    }, [])

    const forward = useCallback(() => {
        currentSlide.current++
        if (currentSlide.current > slides.length) { currentSlide.current = 1; }

        gsap.fromTo(`.img${currentSlide.current}`, {left:400, scale:1.2, zIndex:++zzIndex.current}, {left:0, scale:1, duration:1})
    }, [])

    const keyboardIsPressed = useCallback((ev: KeyboardEvent) => {
        const keyCode = ev.code

        if (keyCode === 'ArrowRight') {
            forward()
        } else if (keyCode === 'ArrowLeft') {
            backward()
        }
    }, [backward, forward])

    useEffect(() => {
        window.addEventListener('keydown', keyboardIsPressed)

        return () => { window.removeEventListener('keydown', keyboardIsPressed) }
    }, [keyboardIsPressed])
    
    
    return (
        <div className="AppMain">
            {/* <div className="">for absolute items</div> */}
            <div className="sectorOvr">
                <div className="TopHdr"><h2>Testimonials</h2></div>
                <div className="slidesSection">
                    <div className="sld_mid_cvr">
                        <div className="patternCvr">
                            <img src={cp1} alt="" />
                        </div>
                        <div className="ImgParOvr">
                            {slides.map((item: slideProps, index: number) => {
                                return <ImgComp key={index} num={index + 1} {...item} />
                            })}
                        </div>
                        <div className="DtsParOvr">
                            {slides.map((item: slideProps, index: number) => {
                                return <DtsComp key={index} num={index + 1} {...item} />
                            })}
                        </div>
                    </div>
                    <div className="btnCvr">
                        <button className="left" onClick={backward}><FaLongArrowAltLeft /></button>
                        <button className="right" onClick={forward}><FaLongArrowAltRight /></button>
                    </div>
                </div>
            </div>
            <div className="absoluteCovers">
                <div className="mainBg">
                    <img src={main_bg} alt="" />
                </div>
                <div className="BuildHold">
                    <img src={building} alt="" />
                </div>
            </div>
        </div>
    )
}
export default App;