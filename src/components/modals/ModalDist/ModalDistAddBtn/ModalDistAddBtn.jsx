import React from 'react';
import s from "./ModalDistAddBtn.module.scss";

const ModalDistAddBtn = ({onClick}) => {
    return (
        <button className={s.addBtn} onClick={onClick}>
            <span className={s.icon}/>
            <span>Еще одна папка</span>
        </button>
    );
};

export default ModalDistAddBtn;