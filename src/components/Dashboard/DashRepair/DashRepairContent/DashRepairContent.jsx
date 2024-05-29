import React from 'react';
import s from './DashRepairContent.module.scss';
import DashRepairItem from "./DashRepairItem/DashRepairItem";
import Loading from "../../../UI/Loading/Loading";

const DashRepairContent = ({filteredServers, isLoading, searchData, allView, setAllView}) => {
    return (
        <div className={s.main}>
            <div className={s.header}>
                <p>Сервер</p>
                <p>Комплектация</p>
                <p>Причина</p>
                <p>Дата неисправности</p>
                <p>Локация</p>
            </div>
            <div className={s.list}>
                {isLoading && <Loading/>}
                {filteredServers?.map((server, i) =>
                    <DashRepairItem key={server.id} server={server} index={i} isActive={!!searchData && server.name.includes(searchData)}/>
                )}
                {allView !== null ?
                    <button className={`${s.btnView} mobile`} onClick={() => setAllView(!allView)}>
                        <span className={`${s.arrow} ${allView ? s.active : ''}`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 4L6 9L11 4" stroke="#1E1E22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <span>{allView === false ? 'Смотреть все' : 'Скрыть'}</span>
                    </button> : false}
            </div>
        </div>
    );
};

export default DashRepairContent;