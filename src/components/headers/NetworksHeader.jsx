import React from 'react';
import s from "./Header.module.scss";
import AddBtn from "./AddBtn/AddBtn";
import SearchInput from "./SearchInput/SearchInput";
import HeaderSwitchBtns from "./HeaderSwitchBtns/HeaderSwitchBtns";

const NetworksHeader = ({searchData, setSearchData, activeTab, setActiveTab, setModalNetwork}) => {
    const isMobile = window.innerWidth <= 768;

    return (
        <div className={s.main}>
            <div>
                {!isMobile && <AddBtn onClick={() => setModalNetwork({isOpen: true})}/>}
                <p className={s.title}>
                    <span>Сети</span>
                </p>
            </div>
            <div>
                {!isMobile &&
                    <HeaderSwitchBtns active={activeTab}
                                      setActive={setActiveTab}
                                      buttons={[
                                          {name: 'Роутеры', val: 'ROUTER'},
                                          {name: 'Root-сервера', val: 'ROOT'}
                                      ]}/>}
                {!isMobile &&
                    <SearchInput searchData={searchData} setSearchData={setSearchData} placeholder="Поиск по IP, названию..."/>}
            </div>
        </div>
    );
};

export default NetworksHeader;