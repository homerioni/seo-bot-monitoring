import React from 'react';
import s from './MonitorHeader.module.scss';

const MonitorHeader = ({type}) => {
    return (
        <div className={s.header}>
            <p className={`${s.btn} ${type === 'delivery' ? s.purple : s.green}`}>
                {type === 'delivery' ? <span>Отправки</span> : ''}
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM23.5303 6.53033C23.8232 6.23744 23.8232 5.76256 23.5303 5.46967L18.7574 0.696699C18.4645 0.403806 17.9896 0.403806 17.6967 0.696699C17.4038 0.989593 17.4038 1.46447 17.6967 1.75736L21.9393 6L17.6967 10.2426C17.4038 10.5355 17.4038 11.0104 17.6967 11.3033C17.9896 11.5962 18.4645 11.5962 18.7574 11.3033L23.5303 6.53033ZM1 6.75H23V5.25H1V6.75Z" fill="white"></path>
                </svg>
                {type === 'receipt' ? <span>Получения</span> : ''}
            </p>
        </div>
    );
};

export default MonitorHeader;