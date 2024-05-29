import React from 'react';
import s from './ModalProjectTitle.module.scss';
import iconProject from '../../../../assets/img/project-icon.svg';

const ModalProjectTitle = ({title}) => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <img src={iconProject} alt=""/>
            </div>
            <p className={s.title}>{title ?
                (<>Редактировать <b>{title}</b></>)
                : 'Новый проект'}
            </p>
        </div>
    );
};

export default ModalProjectTitle;