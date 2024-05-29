import React from 'react';
import s from "./CheatPowerListHeader.module.scss";

const CheatPowerListHeader = () => {
    return (
        <div className={s.main}>
            <div className={s.name}>
                <div className={s.icon}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.22488 3.35999L3.36487 1.5L1.50488 3.35999" stroke="#8998AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.36523 10.5V1.5" stroke="#8998AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.77441 8.64014L8.63443 10.5001L10.4944 8.64014" stroke="#8998AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.63477 1.5V10.5" stroke="#8998AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <p>В сутки <br/>кол-во кликов</p>
            </div>
            <div className={s.name}>Сервер</div>
            <div className={s.name}>Комплектация</div>
            <div className={s.name}>Локация</div>
            <div className={s.name}>4G/провод</div>
            <div className={s.name}>Провайдер</div>
            <div className={s.name}>Роутер</div>
            <div className={s.name}>Проекты</div>
        </div>
    );
};

export default CheatPowerListHeader;