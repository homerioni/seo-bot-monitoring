import React from 'react';
import s from "./ModalAPHeader.module.scss";

const ModalApHeader = ({data}) => {
    return (
        <div className={s.header}>
            <div className={`${s.icon} ${data ? s.edit : ''}`}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path fill='white' d="M29,6H26a1,1,0,0,0,0,2h3a1,1,0,0,1,1,1v5.171a1,1,0,0,1-.293.708l-2.828,2.828a1,1,0,0,1-.708.293H5.829a1,1,0,0,1-.708-.293L2.293,14.879A1,1,0,0,1,2,14.171V9A1,1,0,0,1,3,8H22a1,1,0,0,0,1-1V4a3,3,0,0,0-3-3H12A3,3,0,0,0,9,4V6H3A3,3,0,0,0,0,9v5.171a2.978,2.978,0,0,0,.879,2.122l2.828,2.828A2.978,2.978,0,0,0,5.829,20H26.171a2.978,2.978,0,0,0,2.122-.879L29,18.414V28a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V21a1,1,0,0,0-2,0v7a3.009,3.009,0,0,0,3,3H28a3.009,3.009,0,0,0,3-3V16.414l.121-.121A2.978,2.978,0,0,0,32,14.171V9A3,3,0,0,0,29,6ZM11,4a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1V6H11Z"/>
                    <rect fill='white' height="6" rx="1" width="4" x="7" y="16"/>
                    <rect fill='white' height="6" rx="1" width="4" x="21" y="16"/>
                </svg>
            </div>
            <p>
                {!data ? 'Создание проекта' : 'Редактирование проекта'}
            </p>
        </div>
    );
};

export default ModalApHeader;