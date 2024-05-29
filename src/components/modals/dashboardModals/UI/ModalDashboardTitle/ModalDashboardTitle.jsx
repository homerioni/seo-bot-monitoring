import React from 'react';
import s from './ModalDashboardTitle.module.scss';

const ModalDashboardTitle = ({title, subtitle}) => {
    return (
        <div className={s.header}>
            <p className={s.title}>{title}</p>
            <p className={s.subtitle}>{subtitle}</p>
        </div>
    );
};

export default ModalDashboardTitle;