import React from 'react';
import s from './MonitorWrapper.module.scss';
import MonitorWrapperItem from "./MonitorWrapperItem/MonitorWrapperItem";

const MonitorWrapper = ({data, isAverage, isOpen}) => {
    return (
        <div className={`${s.main} ${!isOpen ? s.closed : ''}`}>
            {data?.settings.map((item, i) => (
                <ul key={i} className={s.list}>
                    {item.info?.map((server, i) => <MonitorWrapperItem key={server.id} index={i} server={server} isAverage={isAverage}/>)}
                </ul>
            ))}
        </div>
    );
};

export default MonitorWrapper;