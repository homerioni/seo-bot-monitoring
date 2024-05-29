import React from 'react';
import s from './ModalLocationContentTitle.module.scss';
import cameraIcon from "../../../../../assets/img/cameraIcon.svg";
import degreeIcon from "../../../../../assets/img/degreeIcon.svg";
import socketIcon from "../../../../../assets/img/socketIcon.svg";

const ModalLocationContentTitle = ({type}) => {
    let data = (() => {
        switch (type) {
            case 'camera':
                return {name: 'Камеры', icon: cameraIcon};
            case 'degree':
                return {name: 'Градусник', icon: degreeIcon};
            case 'socket':
                return {name: 'Умная розетка', icon: socketIcon};
            default:
                return {name: 'Не указан тип', icon: ''};
        }
    })();

    return (
        <div className={s.main}>
            <div className={s.icon}>
                <img src={data.icon} alt=""/>
            </div>
            <span>{data.name}</span>
        </div>
    );
};

export default ModalLocationContentTitle;