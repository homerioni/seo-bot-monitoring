import React from 'react';
import s from './ModalProfSumContent.module.scss';
import ModalProfSumList from "./ModalProfSumList/ModalProfSumList";

const ModalProfSumContent = ({groups, profSumGroups, setProfSumGroups}) => {
    return (
        <div>
            <div className={s.title}>Какие группы выводим в статистику?</div>
            <ModalProfSumList groups={groups} profSumGroups={profSumGroups} setProfSumGroups={setProfSumGroups}/>
        </div>
    );
};

export default ModalProfSumContent;