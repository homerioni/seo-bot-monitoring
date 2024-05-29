import React from 'react';
import s from './NetworkItemDetails.module.scss';
import {cutIp} from "../../../../utils/tools";

const NetworkItemDetails = ({data, type}) => {
    return (
        <div className={`${s.main} ${data.server.status ? s[data.server.status] : data.server.isAlive ? s.active : s.disable}`}>
            <div className={s.header}>
                <p className={`${s.thread} ${data.server.numberOfThreads > 100 ? s.green : s.azure}`}><span>{data.server.numberOfThreads}</span></p>
                <p className={s.name}>{data.server.name}</p>
                <p className={s.ip}>{cutIp(data.server.ip)}</p>
            </div>
            <div className={s.footer}>
                {type !== 'ROOT' && <p className={s.desc}>{data.serverPort} <i>/</i> {data.updatePort}</p>}
                <button type="button" className={`${s.switch}`} style={{display: 'none'}}/>
            </div>
        </div>
    );
};

export default NetworkItemDetails;