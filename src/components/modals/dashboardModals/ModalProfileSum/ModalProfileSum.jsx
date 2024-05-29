import React from 'react';
import s from './ModalProfileSum.module.scss';
import Modal from "../../Modal";
import ModalProfSumContent from "./ModalProfSumContent/ModalProfSumContent";
import ModalDashboardTitle from "../UI/ModalDashboardTitle/ModalDashboardTitle";

const ModalProfileSum = ({setModalProfSum, groups, profSumGroups, setProfSumGroups}) => {
    return (
        <Modal containerClass={s.container} onClose={() => setModalProfSum(false)}>
            <ModalDashboardTitle title={'Сводная диаграмма производства профилей'} subtitle={'Настройка'}/>
            <ModalProfSumContent groups={groups} profSumGroups={profSumGroups} setProfSumGroups={setProfSumGroups}/>
        </Modal>
    );
};

export default ModalProfileSum;