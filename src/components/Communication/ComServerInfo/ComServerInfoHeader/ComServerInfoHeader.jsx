import React from 'react';
import s from "./ComServerInfoHeader.module.scss";
import SwitchBtn from "../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import ServerStatusBar from "../../../Home/Servers/ServerContent/ServerStatusBar/ServerStatusBar";
import {cutIp} from "../../../../utils/tools";

const ComServerInfoHeader = ({selectedServer, setOpenServerId}) => {
    return (
        <div className={s.header}>
            <SwitchBtn active={selectedServer.modes?.length ? selectedServer.isSentActive : undefined}/>
            <ServerStatusBar server={selectedServer}/>
            <div>{selectedServer.name}</div>
            <div>{cutIp(selectedServer.ip)}</div>
            <button className={s.close} onClick={() => setOpenServerId(null)}/>
        </div>
    );
};

export default ComServerInfoHeader;