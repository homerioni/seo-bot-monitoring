import React from 'react';
import s from './ProjectsContentHeader.module.scss';

const ProjectsContentHeader = () => {
    return (
        <div className={s.header}>
            <div>название проекта</div>
            <div>сбор кликов</div>
            <div>Яндекс XML</div>
            <div>серверов</div>
            <div>топвизор</div>
            <div>статистика кликов</div>
            <div>ссылка на сайт</div>
            <div>Карта</div>
        </div>
    );
};

export default ProjectsContentHeader;