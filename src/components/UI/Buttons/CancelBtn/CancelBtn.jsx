import React from 'react';
import s from "./CancelBtn.module.scss";

const CancelBtn = ({text, onClick}) => {
    return (
        <button type="button" className={s.cancel} onClick={onClick}>
            <span>{text ?? 'Отменить'}</span>
        </button>
    );
};

export default CancelBtn;