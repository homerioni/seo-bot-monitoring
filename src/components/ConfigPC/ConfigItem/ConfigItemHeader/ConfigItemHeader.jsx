import React from 'react';
import s from './ConfigItemHeader.module.scss';

const ConfigItemHeader = ({isDetailsOpen, title, icon, modalOpen, qty}) => {
    return (
        <div className={s.main}>
            <div className={`${s.icon}`}>{icon}</div>
            <p className={s.name}>
                <span>{title}</span>
                <sup>{qty}</sup>
            </p>
            <button className={s.addBtn} onClick={modalOpen}>
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 6.18652V22.8115" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.18945 14.5H22.8145" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <div className={`${s.toggleBtn} ${isDetailsOpen ? s.active : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default ConfigItemHeader;