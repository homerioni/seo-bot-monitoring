import React from 'react';
import s from './AlertItem.module.scss';

const AlertItem = ({status, message, setMessages, index, animate}) => {
    const onClose = () => setMessages(prev => prev.filter((e, i) => i !== index));

    return (
        <div className={`${s.alert} ${status ? s.success : s.error} ${animate ? s.showAlert : ''}`} style={{order: -index}}>
            {status ?
                <svg className={s.successIcon} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8046 11L10.6009 22.2149L5.49805 17.1111" stroke="#87D449" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M27.9151 11L16.7114 22.2149L11.6074 17.1111" stroke="#87D449" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                :
                <svg className={s.errorIcon} width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.6367 14.875L27.8867 27.125" stroke="#EB376D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6387 27.1239L27.8887 14.8739" stroke="#EB376D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
            <p className={s.message} dangerouslySetInnerHTML={{__html: message}}/>
            <button className={s.close} onClick={onClose}/>
        </div>
    );
};

export default AlertItem;