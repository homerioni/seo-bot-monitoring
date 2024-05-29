import React from 'react';
import s from "./ManageHeader.module.scss";
import AddBtn from "../../headers/AddBtn/AddBtn";
import HeaderSwitchBtns from "../../headers/HeaderSwitchBtns/HeaderSwitchBtns";
import SearchInput from "../../headers/SearchInput/SearchInput";

const ManageHeader = ({activeTab, setActiveTab, searchData, setSearchData, setModalManagement}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalManagement({isOpen: true})}/>
                <p className={s.title}>
                    <span>Управление задачами</span>
                </p>
            </div>
            <div>
                <HeaderSwitchBtns active={activeTab}
                                  setActive={setActiveTab}
                                  bgStyleDefault={{width: '12.1rem'}}
                                  buttons={[
                                      {name: 'Накрутка', val: 'PROMOTION'},
                                      {name: 'Прокачка', val: 'PUMPING'},
                                  ]}/>
                <SearchInput searchData={searchData} setSearchData={setSearchData} placeholder="Поиск по проекту, url..."/>
            </div>
        </div>
    );
};

export default ManageHeader;