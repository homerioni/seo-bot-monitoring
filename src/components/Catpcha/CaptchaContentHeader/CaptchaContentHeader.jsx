import React from 'react';
import s from './CaptchaContentHeader.module.scss';

const CaptchaContentHeader = () => {
    return (
        <div className={s.header}>
            <div></div>
            <div>on/off</div>
            <div></div>
            <div>Название</div>
            <div>IP-адрес</div>
            <div>Api-ключ</div>
            <div>дата оплаты сервера</div>
            <div>дата оплаты софта</div>
        </div>
    );
};

export default CaptchaContentHeader;