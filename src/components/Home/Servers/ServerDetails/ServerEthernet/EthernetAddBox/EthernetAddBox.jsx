import React from 'react';
import s from './EthernetAddBox.module.scss';
import AddBtn from "../../../../../headers/AddBtn/AddBtn";

const EthernetAddBox = ({setIsCreate, isVisible}) => {
    return (
        <div className={`${s.main} ${isVisible ? s.visible : ''}`}>
            <AddBtn onClick={() => setIsCreate(true)}/>
            <p>Связь 4G / ethernet</p>
        </div>
    );
};

export default EthernetAddBox;