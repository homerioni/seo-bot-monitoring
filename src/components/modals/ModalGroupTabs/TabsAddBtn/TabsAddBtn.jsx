import React from 'react';
import s from './TabsAddBtn.module.scss';

const TabsAddBtn = ({setModalGroupTab}) => {
    const onClick = () => setModalGroupTab({isOpen: true, data: null});

    return (
        <button className={s.addBtn} onClick={onClick}>
            <span className={s.addIcon}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5.41667V20.5833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.41797 13H20.5846" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
            <span>Создать вкладку</span>
        </button>
    );
};

export default TabsAddBtn;