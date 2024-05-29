import React from 'react';
import s from './PumpingThreads.module.scss';

const PumpingThreads = () => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.00024 4.50122L10.8602 2.64121L9.00024 0.78122" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.5 2.49988L10.5 2.49988" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11.2227L10.86 9.36267L9 7.50269" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 9.5L1.5 9.5" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <p>60</p>
        </div>
    );
};

export default PumpingThreads;