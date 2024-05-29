import React from 'react';
import s from './VersionItem.module.scss';
import {cutIp} from "../../../utils/tools";

const getOrder = (server, version) => {
    let order = 3;
    if (server.status === 'PARTIALLY_ACTIVE') {
        order += 10;
    } else if (server.status === 'NON_ACTIVE') {
        order += 20;
    }

    if (!server?.versionName) {
        order += 2;
    } else if (version?.name !== server?.versionName) {
        order += 1;
    }

    return order;
};

const VersionItem = ({server, version, status}) => {
    const statusUpdate = status?.servers ? status?.servers[server.id] : undefined;
    const isWait = status?.wait || statusUpdate === 'wait';
    const order = statusUpdate !== undefined ? (isWait ? 0 : (statusUpdate ? 2 : 1)) : getOrder(server, version);

    return (
        <div className={s.item} style={{order: order}}>
            <p className={`${s.version} ${version?.name !== server?.versionName ? s.old : ''}`}>{server?.versionName ? server.versionName : '?'}</p>
            <div className={`${s.status} ${s[server?.status]}`}></div>
            <p className={s.name}>{server?.name}</p>
            <p className={s.ip}>{server?.ip ? cutIp(server.ip) : ''}</p>
            <div className={s.info}>
                {isWait ? <div className={s.wait}>
                    <span>Ожидание</span>
                    <span className={s.dots}>
                        <span></span>
                    </span>
                </div> : ''}
                {statusUpdate === true ? <div className={s.success}>
                    <span>Обновлен</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M17.9167 4.99927L8.75 14.1751L6 11.4251" stroke="#87D549" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div> : ''}
                {statusUpdate === false ? <div className={s.error}>
                    <span>Ошибка</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M11 1.0603L1 11.0603" stroke="#EB376D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1.0603L11 11.0603" stroke="#EB376D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div> : ''}
            </div>
        </div>
    );
};

export default VersionItem;