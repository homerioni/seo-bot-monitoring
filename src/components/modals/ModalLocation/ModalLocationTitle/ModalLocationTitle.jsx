import React from 'react';
import s from './ModalLocationTitle.module.scss';

const ModalLocationTitle = ({register, data}) => {
    return (
        <div className={`${s.main} ${data ? s.edit : ''}`}>
            <div className={s.icon}>
                <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.7043 8.17073C19.462 2.53659 14.6941 0 10.5059 0C10.5059 0 10.5059 0 10.4941 0C6.31774 0 1.53801 2.52439 0.29575 8.15854C-1.08848 14.4512 2.65012 19.7805 6.03379 23.1341C7.28788 24.378 8.8969 25 10.5059 25C12.1149 25 13.724 24.378 14.9662 23.1341C18.3499 19.7805 22.0885 14.4634 20.7043 8.17073ZM10.5059 14.2805C8.44732 14.2805 6.77915 12.561 6.77915 10.439C6.77915 8.31707 8.44732 6.59756 10.5059 6.59756C12.5645 6.59756 14.2327 8.31707 14.2327 10.439C14.2327 12.561 12.5645 14.2805 10.5059 14.2805Z" fill="white"/>
                </svg>
            </div>
            <p className={s.title}>{data ? 'Редактировать локацию' : 'Новая локация'}</p>
            <label className={s.labelBox}>
                <input {...register('name', {required: true})} type="text" placeholder='Название локации *'/>
            </label>
        </div>
    );
};

export default ModalLocationTitle;