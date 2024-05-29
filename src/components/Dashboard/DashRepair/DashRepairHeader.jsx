import React from 'react';
import s from '../headers/Header.module.scss';
import DashSearchInput from "../headers/UI/DashSearchInput/DashSearchInput";

const DashRepairHeader = ({searchData, setSearchData}) => {
    return (
        <div className={s.main}>
            <div>
                <div className={s.title}>Доступность по локациям (ремонт)</div>
            </div>
            <div>
                <DashSearchInput placeholder={'Поиск по названию...'} value={searchData} setValue={setSearchData}/>
            </div>
        </div>
    );
};

export default DashRepairHeader;