import React from 'react';
import s from './ServerInfoItem.module.scss';

const ServerInfoItem = ({title, desc, isMid, isWide}) => {
    return (
        <div className={s.main + isMid ? ` ${s.big}` : '' + isWide ? ` ${s.flex30}` : ''}>
            <p className={s.title}>{title}</p>
            <p className={s.desc}>{desc}</p>
        </div>
    );
};

export default ServerInfoItem;