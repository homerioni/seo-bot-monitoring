import React from 'react';
import s from '../headers/Header.module.scss';
import DashSearchInput from "../headers/UI/DashSearchInput/DashSearchInput";
import DashStatusBar from "../headers/UI/DashStatusBar/DashStatusBar";

const DashLocationsHeader = ({searchData, setSearchData, statusData}) => {
    return (
        <div className={s.main}>
            <div>
                <DashStatusBar statusData={statusData} className={'desktop'}/>
                <p className={s.title}>Доступность по локациям</p>
            </div>
            <div className="mobile">
                <DashStatusBar statusData={statusData}/>
            </div>
            <div>
                <DashSearchInput placeholder='Поиск по названию..' value={searchData} setValue={setSearchData}/>
            </div>
        </div>
    );
};

export default DashLocationsHeader;