import React from 'react';
import s from './ModalNetworkHeader.module.scss';

const ModalNetworkHeader = ({title, isEdit}) => {
    return (
        <div className={s.main}>
            <div className={`${s.icon} ${isEdit ? s.edit : ''}`}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_3295_264279" maskUnits="userSpaceOnUse" x="1" y="4" width="32" height="28">
                        <path d="M29.75 19.8333H4.25004C3.46764 19.8333 2.83337 20.4675 2.83337 21.2499V28.3333C2.83337 29.1157 3.46764 29.7499 4.25004 29.7499H29.75C30.5324 29.7499 31.1667 29.1157 31.1667 28.3333V21.2499C31.1667 20.4675 30.5324 19.8333 29.75 19.8333Z" fill="white" stroke="white" strokeWidth="2.83333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.91669 24.7916H15.5834" stroke="black" strokeWidth="2.83333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24.0834 24.7917C24.0834 24.0093 23.4491 23.375 22.6667 23.375C21.8843 23.375 21.25 24.0093 21.25 24.7917C21.25 25.5741 21.8843 26.2083 22.6667 26.2083C23.4491 26.2083 24.0834 25.5741 24.0834 24.7917Z" fill="black"/>
                        <path d="M8.50003 19.8333V5.66663M25.5 19.8333V5.66663" stroke="white" strokeWidth="2.83333" strokeLinecap="round" strokeLinejoin="round"/>
                    </mask>
                    <g mask="url(#mask0_3295_264279)">
                        <path d="M3.05176e-05 0H34V34H3.05176e-05V0Z" fill="white"/>
                    </g>
                </svg>
            </div>
            <p className={s.title} dangerouslySetInnerHTML={{__html: title}}/>
        </div>
    );
};

export default ModalNetworkHeader;