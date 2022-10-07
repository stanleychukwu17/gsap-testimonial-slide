import './Dts.scss'
import { slideProps } from '../../types/general.types';


export default function DtsComp(props: slideProps & {num: number}) {
    return (
        <div className={`DtsEchOne dts${props.num}`}>
            <div className="DtsEch1st">
                <div className="">Voluptate veniam mollit ut labore duis ex sunt laboris magna sint deserunt sint. Aliqua enim nisi id Lorem. Et labore laboris duis dolore id velit voluptate. Occaecat dolore qui veniam do duis veniam. Sint veniam pariatur nulla elit velit sunt adipisicing ullamco sunt est laboris est elit non.</div>
                <div className="">{props.name}</div>
                <div className="">{props.position}</div>
            </div>
            <div className="ImgDtsCvr">
                <div className="imgIn"><img src={props.avatar} alt="" /></div>
            </div>
        </div>
    )
}
