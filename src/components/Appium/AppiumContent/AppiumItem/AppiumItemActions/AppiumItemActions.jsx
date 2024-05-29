import React from 'react';
import s from './AppiumItemActions.module.scss';

const AppiumItemActions = () => {
    return (
        <div className={s.main}>
            <button className={s.btn}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8C15 11.864 11.864 15 8 15C4.136 15 1.777 11.108 1.777 11.108M1.777 11.108H4.941M1.777 11.108V14.608M1 8C1 4.136 4.108 1 8 1C12.669 1 15 4.892 15 4.892M15 4.892V1.392M15 4.892H11.892" stroke="#A1B1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className={s.btn}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 3C9.5 3.82843 8.82843 4.5 8 4.5C7.17157 4.5 6.5 3.82843 6.5 3C6.5 2.17157 7.17157 1.5 8 1.5C8.82843 1.5 9.5 2.17157 9.5 3Z" fill="#A1B1C5"/>
                    <path d="M9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8Z" fill="#A1B1C5"/>
                    <path d="M9.5 13C9.5 13.8284 8.82843 14.5 8 14.5C7.17157 14.5 6.5 13.8284 6.5 13C6.5 12.1716 7.17157 11.5 8 11.5C8.82843 11.5 9.5 12.1716 9.5 13Z" fill="#A1B1C5"/>
                </svg>
            </button>
        </div>
    );
};

export default AppiumItemActions;