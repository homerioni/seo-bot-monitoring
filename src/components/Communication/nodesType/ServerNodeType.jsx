import s from './NodeType.module.scss';
import icon from '../../../assets/img/ComServer.svg';
import React, {useEffect, useRef, useState} from "react";
import {cutIp} from "../../../utils/tools";
import HandleBox from "./HandleBox";

const ServerNodeType = ({data}) => {
    const [serverId, setServerId] = useState(null);
    const [server, setServer] = useState(null);
    const inputBoxRef = useRef();

    const onChange = () => {
        inputBoxRef.current.style.height = '0px';
        inputBoxRef.current.style.height = inputBoxRef.current.children[0].scrollHeight + 1 + 'px';
    };

    useEffect(() => {
        setServerId(data.watch(`serverId${data.id}`));
    }, [data]);

    useEffect(() => {
        data.setValue(`serverId${data.id}`, serverId);
    }, [serverId]);

    useEffect(() => {
        setServer(data.servers?.data?.result.find(server => {
            return server.id == serverId;
        }));
    }, [serverId, data]);

    useEffect(() => {
        inputBoxRef.current.style.height = inputBoxRef.current.children[0].scrollHeight + 1 + 'px';
        return () => data.unregister(`${data.id}`);
    }, []);

    return (
        <>
            <div className={`${s.node} ${s.server}`}>
                <input {...data.register(`Id${data.id}`)} type="text" style={{display: 'none'}}/>
                <img src={icon} alt=""/>
                <div className={s.inputBox} ref={inputBoxRef} style={{height: 0}}>
                    <textarea {...data.register(`${data.id}`)} onInput={onChange} disabled={data?.disabled}/>
                    <div className={s.serverInfo}>
                        <p>{cutIp(server?.ip)}</p>
                    </div>
                </div>
                <div className={s.btnBox}>
                    {data?.setModalComServer && <button className={s.edit} onClick={() => data.setModalComServer({isOpen: true, setServerId, serverId})}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.08876 1.00474L0.866469 7.22594C0.626689 7.46568 0.398907 7.93317 0.350951 8.2688L0.015261 10.6422C-0.104629 11.5053 0.494815 12.1046 1.35802 11.9847L3.73182 11.6491C4.06751 11.6012 4.53511 11.3734 4.77489 11.1337L10.9972 4.91247C12.0642 3.84563 12.5797 2.599 10.9972 1.01673C9.41463 -0.577532 8.16777 -0.07408 7.08876 1.00474Z" fill="#8B98EE"/>
                            <path d="M6 2.25C6.50769 4.06154 7.92692 5.49231 9.75 6" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>}
                    {!!serverId &&
                        <button className={s.info} onClick={() => data.setOpenServerId(serverId)}>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.292 8.70651L16.7837 2.21484" stroke="#A1B1C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.4162 5.38203V1.58203H13.6162" stroke="#A1B1C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.70801 1.58203H7.12467C3.16634 1.58203 1.58301 3.16536 1.58301 7.1237V11.8737C1.58301 15.832 3.16634 17.4154 7.12467 17.4154H11.8747C15.833 17.4154 17.4163 15.832 17.4163 11.8737V10.2904" stroke="#A1B1C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>}
                </div>
            </div>
            <HandleBox id={data.id}/>
        </>
    );
}

export default ServerNodeType;