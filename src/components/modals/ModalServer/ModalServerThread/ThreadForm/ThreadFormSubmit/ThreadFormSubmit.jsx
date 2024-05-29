import React from 'react';
import s from './ThreadFormSubmit.module.scss';
import Loading from "../../../../../UI/Loading/Loading";

const ThreadFormSubmit = ({isValid, isLoading}) => {
    return (
        <button className={`${s.submit} ${!isValid ? s.disable : ''}`}>
            {isLoading ? <Loading/> : ''}
            <span className={s.icon}>
                {isValid ?
                    <svg className={s.ok} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9167 4.99994L8.75 14.1758L6 11.4258" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    :
                    <svg className={s.no} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.74805 9.98572L17.7761 18.0138" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.75 18.0131L17.7781 9.98497" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
            </span>
            <span>Сохранить</span>
        </button>
    );
};

export default ThreadFormSubmit;