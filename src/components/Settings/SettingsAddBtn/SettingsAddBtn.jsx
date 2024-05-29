import React from 'react';
import s from './SettingsAddBtn.module.scss';

const SettingsAddBtn = ({setAddForm}) => {
    return (
        <button type="button" className={s.btn} onClick={() => setAddForm({isOpen: true, data: null})}>
            <span className={s.icon}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5.41663V20.5833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.41797 13H20.5846" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
            <span className={s.text}>Добавить ещё тип</span>
        </button>
    );
};

export default SettingsAddBtn;