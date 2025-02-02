import React from 'react';
import s from './TabTitle.module.scss';

const TabTitle = ({data, register}) => {
    return (
        <div className={s.main}>
            <div className={`${s.icon} ${data ? s.edit : ''}`}>
                <svg width="19" height="29" viewBox="0 0 19 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5179 19.3333H14.25C18.05 19.3333 19 18.3667 19 14.5V8.7C19 4.83333 18.05 3.86667 14.25 3.86667H11.4C10.45 3.86667 10.2464 3.57667 9.88 3.09333L8.455 1.16C7.91214 0.428095 7.6 0 6.175 0H4.75C0.95 0 0 0.966666 0 4.83333V14.5C0 18.3667 0.95 19.3333 4.75 19.3333H8.48214V23.4762C8.48214 23.5452 8.50928 23.6005 8.52286 23.6695C7.81714 23.9457 7.24799 24.4843 6.97656 25.2024C6.90871 25.1886 6.85357 25.2024 6.78571 25.2024H1.35714C0.800714 25.2024 0.339286 25.6719 0.339286 26.2381C0.339286 26.8043 0.800714 27.2738 1.35714 27.2738H6.78571C6.85357 27.2738 6.90871 27.2876 6.97656 27.2738C7.37013 28.3095 8.34643 29 9.5 29C10.6536 29 11.6307 28.3095 12.0243 27.2738C12.0921 27.2876 12.1464 27.2738 12.2143 27.2738H17.6429C18.1993 27.2738 18.6607 26.8043 18.6607 26.2381C18.6607 25.6719 18.1993 25.2024 17.6429 25.2024H12.2143C12.1464 25.2024 12.0747 25.1886 12.0068 25.2024C11.7354 24.4843 11.1829 23.9457 10.4771 23.6695C10.4907 23.6005 10.5179 23.5452 10.5179 23.4762V19.3333Z" fill="white"/>
                    <path d="M11.25 26.25C11.25 27.2165 10.4665 28 9.5 28C8.5335 28 7.75 27.2165 7.75 26.25C7.75 25.2835 8.5335 24.5 9.5 24.5C10.4665 24.5 11.25 25.2835 11.25 26.25Z" fill="#7ADA7E"/>
                </svg>
            </div>
            <div>
                {data ? <p className={s.subTitle}>вкладка</p> : ''}
                <p className={s.title}>{data ? data.name : 'Создание вкладки'}</p>
            </div>
            <label className={s.nameLabel}>
                <input placeholder="Название вкладки" {...register('name', {required: 'Обязательное поле'})}/>
            </label>
        </div>
    );
};

export default TabTitle;