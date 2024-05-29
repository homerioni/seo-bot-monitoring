import React from 'react';
import s from '../headers/Header.module.scss';
import DashSettingBtn from "../headers/UI/DashSettingBtn/DashSettingBtn";

const ProfileSumHeader = ({setModalProfSum}) => {
    return (
        <div className={s.main}>
            <div>
                <p className={s.title}>Сводная диаграмма производства профилей</p>
                <DashSettingBtn onClick={() => setModalProfSum(true)} className={'mobile'}/>
            </div>
            <div className={'desktop'}>
                <DashSettingBtn onClick={() => setModalProfSum(true)}/>
            </div>
        </div>
    );
};

export default ProfileSumHeader;