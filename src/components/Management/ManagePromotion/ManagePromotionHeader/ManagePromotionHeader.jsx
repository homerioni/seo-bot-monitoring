import React from 'react';
import s from './ManagePromotionHeader.module.scss';

const ManagePromotionHeader = () => {
    return (
        <div className={s.main}>
            <div>Действ.</div>
            <div>Проект</div>
            <div>URL</div>
            <div>Поиск</div>
            <div>Регион</div>
            <div>Статус</div>
        </div>
    );
};

export default ManagePromotionHeader;