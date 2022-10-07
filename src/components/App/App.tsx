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
    const lock = useRef<boolean|null>(null)

    const backward = useCallback(() => {
        if (lock.current) { return }
        lock.current = true
        const curImg = `.img${currentSlide.current}`
        const curDts = `.dts${currentSlide.current}`

        currentSlide.current--
        if (currentSlide.current < 1) { currentSlide.current = slides.length; }


        // animates the current item out
        gsap.to(curImg, {left:400, duration:1.2})
        gsap.to(curDts, {top:295, opacity:0, duration:.5})


        // animates the next item in
        const nextImg = `.img${currentSlide.current}`
        const nextDts = `.dts${currentSlide.current}`
        gsap.fromTo(nextImg, {left:-400, scale:1.2, zIndex:++zzIndex.current}, {left:0, scale:1, duration:.5})
        gsap.fromTo(nextDts, {top:-295, opacity:1, zIndex:++zzIndex.current}, {top:0, duration:.5, onComplete:() => {lock.current = false} })
    }, [])

    const forward = useCallback(() => {
        if (lock.current) { return }
        lock.current = true
        const curImg = `.img${currentSlide.current}`
        const curDts = `.dts${currentSlide.current}`

        currentSlide.current++
        if (currentSlide.current > slides.length) { currentSlide.current = 1; }


        // animates the current item out
        gsap.to(curImg, {left:-400, duration:1.2})
        gsap.to(curDts, {top:-295, opacity:0, duration:.5})


        // animates the next item in
        const nextImg = `.img${currentSlide.current}`
        const nextDts = `.dts${currentSlide.current}`
        gsap.fromTo(nextImg, {left:400, scale:1.2, zIndex:++zzIndex.current}, {left:0, scale:1, duration:.5})
        gsap.fromTo(nextDts, {top:295, opacity:1, zIndex:++zzIndex.current}, {top:0, duration:.5, onComplete:() => {lock.current = false} })
    }, [])

    const keyboardIsPressed = useCallback((ev: KeyboardEvent) => {
        const keyCode = ev.code

        if (keyCode === 'ArrowRight') {
            forward()
        } else if (keyCode === 'ArrowLeft') {
            backward()
        }
    }, [backward, forward])

    // adds the keyboard event for sliding through images
    useEffect(() => {
        // animates all the items in
        gsap.fromTo('.TopHdr', {y:-10}, {y:0, opacity:1, duration:.5}) // header
        gsap.fromTo('.left', {x:-20}, {x:0, opacity:1, delay:.5, duration:.5}) // left buttons
        gsap.fromTo('.right', {x:20}, {x:0, opacity:1, delay:.5, duration:.5}) // right buttons
        gsap.fromTo('.ImgParOvr', {y:10, opacity:0}, {y:0, opacity:1, delay:.2, duration:.5}) // image cover
        gsap.fromTo('.patternCvr', {x:10, opacity:0}, {x:0, opacity:1, delay:.5, duration:1}) // circle pattern
        gsap.to('.patternCvr',  {rotate: +360, transformOrigin:'center', delay:1.5, duration:10, repeat: -1, ease:"none"}) // circle pattern
        gsap.fromTo('.DtsParOvr', {y:-10, opacity:0}, {y:0, opacity:1, delay:.2, duration:.5}) // details cover

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
                        <div className="patternCvr"> <img src={cp1} alt="" /> </div>
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