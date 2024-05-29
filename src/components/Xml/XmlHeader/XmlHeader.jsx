import React from 'react';
import s from './XmlHeader.module.scss';

const XmlHeader = () => {
    return (
        <div className={s.header}>
            <div>название аккаунта</div>
            <div>ip-адрес прокси</div>
            <div>логин аккаунта</div>
            <div></div>
        </div>
    );
};

export default XmlHeader;