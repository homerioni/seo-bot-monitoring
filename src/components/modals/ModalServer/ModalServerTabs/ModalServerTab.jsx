import React from 'react';
import s from "./ModalServerTabs.module.scss";

const ModalServerTab = ({name, classState, onClick, isActive}) => {
    return (
        <button type='button' className={`${s.tab} ${isActive} ${classState}`} onClick={onClick}>
            {classState ?
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5.41734V20.584" stroke="#92A1B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.41797 13.0007H20.5846" stroke="#92A1B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                : ''}
            <span>{name}</span>
        </button>
    );
};

export default ModalServerTab;