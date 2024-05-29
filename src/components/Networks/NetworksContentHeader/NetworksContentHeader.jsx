import React from 'react';
import s from './NetworksContentHeader.module.scss';

const NetworksContentHeader = () => {
    return (
        <div className={`${s.header} desktop`}>
            <div>
                <span>on/off</span>
            </div>
            <div>
                <span>Название</span>
            </div>
            <div>
                <span>IP-адрес</span>
            </div>
            <div>
                <span>локация</span>
            </div>
            <div>
                <span>Подключенных серверов</span>
            </div>
        </div>
    );
};

export default NetworksContentHeader;