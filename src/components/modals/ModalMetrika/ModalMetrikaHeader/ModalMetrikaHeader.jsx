import React from 'react';
import s from './ModalMetrikaHeader.module.scss';
import metrikaIcon from '../../../../assets/img/yaMetrika.svg';

const ModalMetrikaHeader = ({data}) => {
    return (
        <div className={s.header}>
            <div className={s.icon}>
                <img src={metrikaIcon} alt=""/>
            </div>
            <div className={s.title}>
                <span>{data ? 'Редактировать' : 'Новый'}</span>
                <label className={s.name}>
                    <b>{data ? `Аккаунт #${data.id - 999}` : 'Аккаунт Я.Метрика'}</b>
                    <input type="text" style={{display: 'none'}}/>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.8146 1.67457L1.44412 12.0432C1.04448 12.4428 0.664845 13.222 0.584919 13.7813L0.025435 17.737C-0.174381 19.1754 0.824691 20.1744 2.26337 19.9746L6.2197 19.4152C6.77918 19.3353 7.55852 18.9557 7.95815 18.5561L18.3286 8.18745C20.107 6.40939 20.9662 4.33166 18.3286 1.69454C15.6911 -0.962553 13.6129 -0.123467 11.8146 1.67457Z" fill="#A1B1C5"/>
                        <path d="M10 3.75C10.8462 6.76923 13.2115 9.15385 16.25 10L10 3.75Z" fill="#A1B1C5"/>
                        <path d="M10 3.75C10.8462 6.76923 13.2115 9.15385 16.25 10" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default ModalMetrikaHeader;