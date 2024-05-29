import React from 'react';
import s from './PumpingCycle.module.scss';

const PumpingCycle = () => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.79004 2.57812H8.71005C9.54005 2.57812 10.2101 3.24813 10.2101 4.07812V5.73813" stroke="#FE6E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.37004 1L1.79004 2.57999L3.37004 4.16" stroke="#FE6E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.2101 9.42172H3.29004C2.46004 9.42172 1.79004 8.75172 1.79004 7.92172V6.26172" stroke="#FE6E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.62988 10.9998L10.2099 9.41986L8.62988 7.83984" stroke="#FE6E1E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <p>12331</p>
            <p>65820</p>
            <p>60180</p>
        </div>
    );
};

export default PumpingCycle;