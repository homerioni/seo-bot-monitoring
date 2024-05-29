import React from 'react';
import s from './ServerDamageItem.module.scss';
import SwitchBtn from "../../../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import ServerDamageDel from "./ServerDamageDel";

const ServerDamageItem = ({number, thread, setModalConfirm, setModalDamage}) => {
    const onEdit = () => setModalDamage({isOpen: true, data: {number, thread}})

    return (
        <div className={s.main}>
            <div className={s.name}>
                <span>{number}</span>
                <span>{thread.name}</span>
            </div>
            <div className={s.control}>
                <div>
                    <SwitchBtn style={{cursor: 'not-allowed'}}/>
                    <button className={s.editBtn} onClick={onEdit}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.08876 1.00474L0.866469 7.22594C0.626689 7.46568 0.398907 7.93317 0.350951 8.2688L0.015261 10.6422C-0.104629 11.5053 0.494815 12.1046 1.35802 11.9847L3.73182 11.6491C4.06751 11.6012 4.53511 11.3734 4.77489 11.1337L10.9972 4.91247C12.0642 3.84563 12.5797 2.599 10.9972 1.01673C9.41463 -0.577532 8.16777 -0.07408 7.08876 1.00474Z" fill="#8B98EE"/>
                            <path d="M6 2.25C6.50769 4.06154 7.92692 5.49231 9.75 6" stroke="#F1F2F6" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <div className={s.stat}>
                        <div>
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5013 2.23328C3.64547 2.23328 2.13672 3.65328 2.13672 5.39994C2.13672 7.11328 3.56047 8.49994 5.4163 8.55994C5.47297 8.55328 5.52964 8.55328 5.57214 8.55994C5.5863 8.55994 5.59338 8.55994 5.60755 8.55994C5.61463 8.55994 5.61464 8.55994 5.62172 8.55994C7.43505 8.49994 8.8588 7.11328 8.86589 5.39994C8.86589 3.65328 7.35714 2.23328 5.5013 2.23328Z" fill="#8B98EE"/>
                                <path d="M9.09672 10.3332C7.12047 9.0932 3.89755 9.0932 1.90714 10.3332C1.00755 10.8999 0.511719 11.6665 0.511719 12.4865C0.511719 13.3065 1.00755 14.0665 1.90005 14.6265C2.89172 15.2532 4.19505 15.5665 5.49839 15.5665C6.80172 15.5665 8.10505 15.2532 9.09672 14.6265C9.98922 14.0599 10.4851 13.2999 10.4851 12.4732C10.478 11.6532 9.98922 10.8932 9.09672 10.3332Z" fill="#8B98EE"/>
                            </svg>
                            <span>{thread.numberOfSuccessfulFixProfilesToday ?? '?'}</span>
                        </div>
                        <div>
                            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 14.25C10.9518 14.25 13.75 11.4518 13.75 8C13.75 4.54822 10.9518 1.75 7.5 1.75C4.04822 1.75 1.25 4.54822 1.25 8C1.25 11.4518 4.04822 14.25 7.5 14.25Z" stroke="#EB376D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.375 6.125L5.625 9.875" stroke="#EB376D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.625 6.125L9.375 9.875" stroke="#EB376D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{thread.numberOfFailedFixProfilesToday ?? '?'}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <ServerDamageDel setModalConfirm={setModalConfirm} thread={thread}/>
                </div>
            </div>
        </div>
    );
};

export default ServerDamageItem;