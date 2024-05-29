import React from 'react';
import s from './ManagePumpingHeader.module.scss';

const ManagePumpingHeader = () => {
    return (
        <div className={s.main}>
            <div>Действ.</div>
            <div>Проект</div>
            <div>Статус</div>
        </div>
    );
};

export default ManagePumpingHeader;