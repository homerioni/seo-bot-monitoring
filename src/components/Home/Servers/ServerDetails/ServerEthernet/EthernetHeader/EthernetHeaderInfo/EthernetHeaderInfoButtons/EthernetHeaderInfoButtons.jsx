import React from 'react';
import s from './EthernetHeaderInfoButtons.module.scss';

const EthernetHeaderInfoButtons = ({isEdit, setIsEdit}) => {
    return (
        <div className={s.buttons}>
            <button type='button' className={`${s.edit} ${isEdit ? s.hide : ''}`} onClick={() => setIsEdit(true)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.08876 2.00474L1.86647 8.22594C1.62669 8.46568 1.39891 8.93317 1.35095 9.2688L1.01526 11.6422C0.895371 12.5053 1.49481 13.1046 2.35802 12.9847L4.73182 12.6491C5.06751 12.6012 5.53511 12.3734 5.77489 12.1337L11.9972 5.91247C13.0642 4.84563 13.5797 3.599 11.9972 2.01673C10.4146 0.422468 9.16777 0.92592 8.08876 2.00474Z" fill="#8B98EE"/>
                    <path d="M7 3.25C7.50769 5.06154 8.92692 6.49231 10.75 7" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button type='submit' className={`${isEdit ? '' : s.hide}`} onClick={() => setIsEdit(false)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 4.5L6.75 12.75L3 9" stroke="#87D549" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button type='button' className={`${isEdit ? '' : s.hide}`} onClick={() => setIsEdit(false)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 4.5L4.5 13.5" stroke="#EB376D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.5 4.5L13.5 13.5" stroke="#EB376D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default EthernetHeaderInfoButtons;