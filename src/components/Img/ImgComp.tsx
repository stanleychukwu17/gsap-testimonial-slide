import { slideProps } from '../../types/general.types';

export default function ImgComp(props: slideProps) {
    console.log(props)
    return (
        <div className="imgMainCvr">
            <div className="">
                <img src={props.img} alt="" />
            </div>
            <div className="">

            </div>
        </div>
    )
}