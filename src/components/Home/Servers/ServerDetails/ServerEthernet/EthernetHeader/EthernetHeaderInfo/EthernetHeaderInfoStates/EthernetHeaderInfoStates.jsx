import React from 'react';
import s from './EthernetHeaderInfoStates.module.scss'

const EthernetHeaderInfoStates = () => {
    return (
        <div className={s.infoBox}>
            <div className={s.info}>
                <i/>
                <span>4G</span>
            </div>
            <div className={s.info}>
                <i/>
                <span>Ethernet</span>
            </div>
            <div className={s.info}>
                <i/>
                <span>Нет связи</span>
            </div>
        </div>
    );
};

export default EthernetHeaderInfoStates;