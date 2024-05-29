import React from 'react';
import s from './ServerDamage.module.scss';
import ServerDamageItem from "./ServerDamageItem/ServerDamageItem";

const ServerDamage = ({threads, setModalConfirm, setModalDamage}) => {
    return (
        <div>
            <div className={s.separator}/>
            <div className={s.btnBox}>
                <button type="button" className={s.btn} style={{cursor: 'not-allowed'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4.58276V17.4161" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.58594 11H17.4193" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <span>Автоматические восстановление профилей</span>
            </div>
            <div className={s.items}>
                {threads?.length ?
                    threads.map((thread, i) => {
                        return <ServerDamageItem key={thread.id} number={`#${i + 1}`} thread={thread} setModalConfirm={setModalConfirm} setModalDamage={setModalDamage}/>
                    }) : ''}
            </div>
        </div>
    );
};

export default ServerDamage;