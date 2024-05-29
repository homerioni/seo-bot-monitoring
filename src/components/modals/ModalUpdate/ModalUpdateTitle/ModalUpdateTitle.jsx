import React from 'react';
import s from './ModalUpdateTitle.module.scss';

const ModalUpdateTitle = () => {
    return (
        <div className={s.titleBox}>
            <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                <circle cx="35.5" cy="35.5" r="35.5" fill="#8B98EE"/>
                <path d="M46.8346 35C46.8346 40.98 41.9813 45.8334 36.0013 45.8334C30.0213 45.8334 26.3705 39.81 26.3705 39.81M26.3705 39.81H31.2671M26.3705 39.81V45.2267M25.168 35C25.168 29.02 29.978 24.1667 36.0013 24.1667C43.2271 24.1667 46.8346 30.19 46.8346 30.19M46.8346 30.19V24.7734M46.8346 30.19H42.0246" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className={s.title}>Серверы, подлежащие обновлению</p>
        </div>
    );
};

export default ModalUpdateTitle;