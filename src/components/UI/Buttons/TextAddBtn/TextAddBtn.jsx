import React from 'react';
import s from './TextAddBtn.module.scss';

const RecipientFormAddBtn = ({onClick, className, text, type, ...props}) => {
    return (
        <button type={type ?? 'button'} className={`${s.main} ${className}`} onClick={onClick} {...props}>
            <div className={s.icon}/>
            <span>{text ?? 'Добавить'}</span>
        </button>
    );
};

export default RecipientFormAddBtn;