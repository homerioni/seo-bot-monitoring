import React from 'react';
import s from "./PumpingContentHeader.module.scss";

const PumpingContentHeader = () => {
    return (
        <div className={s.header}>
            <p>действия</p>
            <p>сеть</p>
            <p>on/OFF</p>
            <p>сервер</p>
            <p>статус</p>
            <p>доступ</p>
            <p>Локация</p>
            <p>комплектация</p>
            <p>потоки</p>
            <p>схема</p>
            <p>warmup сейчас</p>
            <p>среднее пп</p>
            <p>отправки</p>
            <p>циклы с/в/п</p>
            <p>устройства</p>
            <p>нагрузка</p>
            <p>рем.</p>
            <p>СОФТ</p>
        </div>
    );
};

export default PumpingContentHeader;