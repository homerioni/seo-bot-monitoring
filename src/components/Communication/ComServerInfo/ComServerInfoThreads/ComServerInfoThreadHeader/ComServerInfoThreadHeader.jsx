import React from 'react';
import s from './ComServerInfoThreadHeader.module.scss';
import ComThreadHeaderInfo from "./ComThreadHeaderInfo/ComThreadHeaderInfo";

const ComServerInfoThreadHeader = ({data}) => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <img src={data.settingsTypeIconLink} alt=""/>
            </div>
            <p className={s.name}>{data.name}</p>
            <ComThreadHeaderInfo data={data}/>
        </div>
    );
};

export default ComServerInfoThreadHeader;