import React, {useEffect, useState} from 'react';
import s from "./Header.module.scss";
import StatServers from "./StatServers/StatServers";
import SearchInput from "./SearchInput/SearchInput";
import ProfStatFilter from "../ProfStat/ProfStatFilter/ProfStatFilter";
import ProfStatTabs from "./ProfStatTabs/ProfStatTabs";

const ProfStatHeader = ({setSearchData, servers, settings, setFilterData, filterData, activeGlobalTab, setActiveGlobalTab}) => {
    const [serversHasSetting, setServersHasSetting] = useState(null);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        const settingsIds = settings.data?.result?.map(el => el.serverId);
        if (settingsIds) {
            const filteredServers = servers.data?.result.filter(server => settingsIds?.includes(server.id));
            setServersHasSetting(filteredServers);
        }
    }, [settings.data, servers.data]);

    const onKeyUp = e => {
        if (e.keyCode === 13) {
            setSearchData(searchVal);
        }
    };

    const iconClick = () => {
        setSearchData(searchVal);
    }

    return (
        <div className={s.main}>
            <div>
                <div className={s.titleBox}>
                    <p className={s.title}>
                        <span>Статистика прокачки профилей</span>
                        <sup>{serversHasSetting?.length}</sup>
                    </p>
                    <StatServers serversData={serversHasSetting}/>
                </div>
            </div>
            <div>
                <ProfStatTabs activeGlobalTab={activeGlobalTab} setActiveGlobalTab={setActiveGlobalTab}/>
                <SearchInput placeholder={'Для поиска нажмите Enter'} searchData={searchVal} setSearchData={setSearchVal} onKeyUp={onKeyUp} iconClick={iconClick}/>
                <ProfStatFilter serversData={servers.data} filterData={filterData} setFilterData={setFilterData}/>
            </div>
        </div>
    );
};

export default ProfStatHeader;