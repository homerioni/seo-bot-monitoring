import React from 'react';
import s from './HeaderBtnAdd.module.scss';

const HeaderAdd = ({text, onClick, bgColor}) => {
    return (
        <button type='button' className={s.main} onClick={onClick} style={{background: bgColor}}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 5.41699V20.5837" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.41797 13H20.5846" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{text}</span>
        </button>
    );
};

export default HeaderAdd;