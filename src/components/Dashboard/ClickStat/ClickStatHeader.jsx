import React from 'react';
import s from '../headers/Header.module.scss';
import DashSearchInput from "../headers/UI/DashSearchInput/DashSearchInput";
import DashSettingBtn from "../headers/UI/DashSettingBtn/DashSettingBtn";

const ClickStatHeader = ({searchData, setSearchData}) => {
    return (
        <div className={s.main}>
            <div>
                <p className={s.title}>
                    Сводная статистика кликов по проектам
                </p>
            </div>
            <div>
                <DashSearchInput placeholder={'Поиск по названию проекта...'} setValue={setSearchData} value={searchData}/>
                {/*<DashSettingBtn/>*/}
            </div>
        </div>
    );
};

export default ClickStatHeader;