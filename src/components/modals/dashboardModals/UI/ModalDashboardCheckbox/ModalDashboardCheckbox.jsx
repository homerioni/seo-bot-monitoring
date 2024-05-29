import React from 'react';
import s from './ModalDashboardCheckbox.module.scss';

const ModalDashboardCheckbox = ({value, onChange, defaultChecked, bg = true}) => {
    return (
        <>
            <input className={s.input} type="checkbox" value={value} onChange={onChange} defaultChecked={defaultChecked}/>
            <div className={`${s.check} ${bg ? s.box : ''}`}>
                <div>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5L6.1875 10L4 7.72727" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default ModalDashboardCheckbox;