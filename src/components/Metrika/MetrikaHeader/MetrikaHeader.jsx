import React from 'react';
import s from './MetrikaHeader.module.scss';

const MetrikaHeader = () => {
    return (
        <div className={s.header}>
            <div>название аккаунта</div>
            <div>id счетчика</div>
            <div>ТОКЕН</div>
            <div></div>
        </div>
    );
};

export default MetrikaHeader;