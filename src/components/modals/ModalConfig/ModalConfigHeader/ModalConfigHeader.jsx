import React from 'react';
import s from './ModalConfigHeader.module.scss';
import {configPCIcons} from "../../../ConfigPC/configPCIcons";

const ModalConfigHeader = ({type, data}) => {
    const title = {
        PROCESSOR: !!data ? `Редактирование процессора ${data.name}` : 'Новый процессор',
        VIDEO_ADAPTER: !!data ? `Редактирование видеокарты ${data.name}` : 'Новая видеокарта',
        POWER_SUPPLY: !!data ? `Редактирование блока питания ${data.name}` : 'Новый блок питания',
        HARD_DRIVE: !!data ? `Редактирование накопителя ${data.name}` : 'Новый SSD / HDD',
        RAM: !!data ? `Редактирование RAM ${data.name}` : 'Новый RAM',
        THERMAL_PASTE: !!data ? `Редактирование термопасты ${data.name}` : 'Новая термопаста'
    }[type];

    const icon = configPCIcons[type];

    return (
        <div className={s.header}>
            <div className={`${s.icon} ${data ? s.edit : ''}`}>{icon}</div>
            <p className={s.title}>{title}</p>
        </div>
    );
};

export default ModalConfigHeader;