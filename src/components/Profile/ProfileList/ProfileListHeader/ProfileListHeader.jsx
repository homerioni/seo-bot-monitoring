import React from 'react';
import s from './ProfileListHeader.module.scss';

const ProfileListHeader = () => {
    return (
        <div className={s.main}>
            <div/>
            <div>Логин</div>
            <div>Имя Фамилия</div>
            <div>Роли</div>
            <div>Статус</div>
        </div>
    );
};

export default ProfileListHeader;