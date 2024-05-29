import s from './NodeType.module.scss';
import icon from '../../../assets/img/ComSwitch.svg';
import React, {useEffect, useRef} from "react";
import HandleBox from "./HandleBox";

const SwitchNodeType = ({data}) => {
    const inputBoxRef = useRef();

    const onChange = () => {
        inputBoxRef.current.style.height = '0px';
        inputBoxRef.current.style.height = inputBoxRef.current.children[0].scrollHeight + 1 + 'px';
    };

    useEffect(() => {
        inputBoxRef.current.style.height = inputBoxRef.current.children[0].scrollHeight + 1 + 'px';
        return () => data.unregister(`${data.id}`);
    }, []);

    return (
        <>
            <div className={`${s.node} ${s.switch}`}>
                <img src={icon} alt=""/>
                <div className={s.inputBox} ref={inputBoxRef} style={{height: 0}}>
                    <textarea {...data.register(`${data.id}`)} onInput={onChange} disabled={data?.disabled}/>
                </div>
            </div>
            <HandleBox id={data.id}/>
        </>
    );
}

export default SwitchNodeType;