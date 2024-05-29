import React from 'react';
import s from './LocationsContentHeader.module.scss';

const LocationsContentHeader = () => {
    return (
        <div className={s.header}>
            <div>название</div>
            <div></div>
            <div>серверов</div>
            <div>температура</div>
            <div>розетки</div>
        </div>
    );
};

export default LocationsContentHeader;