import React from 'react';
import s from './AppiumProjectsHeader.module.scss';
import AddBtn from "../../headers/AddBtn/AddBtn";
import HeaderSwitchBtns from "../../headers/HeaderSwitchBtns/HeaderSwitchBtns";
import SearchInput from "../../headers/SearchInput/SearchInput";

const AppiumProjectsHeader = ({searchData, setSearchData, setModalProjects}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalProjects({isOpen: true})}/>
                <p className={s.title}>
                    <span>Управление проектами</span>
                </p>
            </div>
            <div>
                <SearchInput searchData={searchData} setSearchData={setSearchData} placeholder="Поиск по названию, url..."/>
            </div>
        </div>
    );
};

export default AppiumProjectsHeader;