import React from 'react';
import s from './Header.module.scss';
import AddBtn from "./AddBtn/AddBtn";
import StatServers from "./StatServers/StatServers";
import SearchInput from "./SearchInput/SearchInput";
import FolderSendBtn from "./FolderSendBtn/FolderSendBtn";
import Filters from "./Filters/Filters";

const MainHeader = ({searchData, locationsData, setSearchData, serversData, projectsData, setModalConfirm, setModalLog, setModalServer, setFilterData, filterData}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalServer({isOpen: true, id: null})}/>
                <div>
                    <p className={s.title}>
                        <span>Все серверы</span>
                        <sup>{serversData?.length}</sup>
                    </p>
                    <StatServers serversData={serversData}/>
                </div>
            </div>
            <div>
                <SearchInput placeholder={'Поиск по IP, названию...'} searchData={searchData} setSearchData={setSearchData}/>
                <Filters projectsData={projectsData} serversData={serversData} locationsData={locationsData} setFilterData={setFilterData} filterData={filterData}/>
                <FolderSendBtn setModalConfirm={setModalConfirm} setModalLog={setModalLog}/>
            </div>
        </div>
    );
};

export default MainHeader;