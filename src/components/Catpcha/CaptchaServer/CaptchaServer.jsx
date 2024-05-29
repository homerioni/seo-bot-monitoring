import React, {useState} from 'react';
import s from './CaptchaServer.module.scss';
import CatpchaServerOwner from "./CatpchaServerOwner";
import {cutIp} from "../../../utils/tools";
import DotBtnList from "../../UI/DotBtnList/DotBtnList";

const CaptchaServer = ({server, handleDel, handleEdit}) => {
    const [isUpper, setIsUpper] = useState(false);

    return (
        <div className={`${s.main} ${isUpper ? s.upper : ''}`}>
            <DotBtnList onDel={() => handleDel(server.id, server.name)} onEdit={() => handleEdit(server)} handleToggle={state => setIsUpper(state)}/>
            <div>
                <div className={`${s.status} ${server.status === 'SUCCESS' ? s.active : s.disable}`}></div>
            </div>
            <CatpchaServerOwner owner={server.affiliation}/>
            <div>{server.name}</div>
            <div>{cutIp(server.ip)}</div>
            <div>{server.apiKey}</div>
            <div>{server.serverPaymentDate}</div>
            <div>{server.softPaymentDate}</div>
        </div>
    );
};

export default CaptchaServer;