import React from 'react';
import s from './APContentHeader.module.scss';

const ApContentHeader = () => {
    return (
        <div className={s.main}>
            <div>Наименование</div>
            <div>URL домен</div>
            <div>Регион</div>
            <div>Приоритет</div>
            <div/>
            <div/>
        </div>
    );
};

export default ApContentHeader;