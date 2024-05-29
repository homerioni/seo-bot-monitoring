import React from 'react';
import s from  './MonitorItemHeader.module.scss';
import MonitorItemHeaderList from "./MonitorItemHeaderList";

const MonitorItemHeader = ({data, isAverage, setIsOpen, isOpen}) => {
    return (
        <div className={s.main}>
            <p className={s.titleBox} onClick={() => setIsOpen(!isOpen)}>
                <svg className={!isOpen ? s.closed : ''} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1.75L6 6.25L10.5 1.75" stroke="#92A1B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>{data?.periodName}</span>
            </p>
            {data?.settings.map((item, i) => <MonitorItemHeaderList key={i} isAverage={isAverage} setting={item}/>)}
        </div>
    );
};

export default MonitorItemHeader;