import { slideProps } from '../../types/general.types';

import './imgComp.scss'

export default function ImgComp(props: slideProps) {
    
    return (
        <div className="imgEchOne">
            <img src={props.img} alt="" />
        </div>
    )
}