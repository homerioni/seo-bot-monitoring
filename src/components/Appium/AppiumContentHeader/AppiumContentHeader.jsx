import React from 'react';
import s from './AppiumContentHeader.module.scss';

const AppiumContentHeader = () => {
    return (
        <div className={s.header}>
            <p>действия</p>
            <p>сеть</p>
            <p>сервер</p>
            <p>решение</p>
            <p>доступ</p>
            <p>локация</p>
            <p>комплектация</p>
            <p>нагрузка</p>
            <p>софт</p>
            <p/>
            <p>Стат действий</p>
            <p>Стат профилей</p>
            <p>рем.</p>
        </div>
    );
};

export default AppiumContentHeader;