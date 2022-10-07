import { slideProps } from '../../types/general.types';

import './imgComp.scss'

export default function ImgComp(props: slideProps & {num: number}) {
    
    return (
        <div className={`imgEchOne img${props.num}`}>
            <img src={props.img} alt="" />
        </div>
    )
}