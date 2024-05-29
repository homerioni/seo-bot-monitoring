import React, {useContext, useEffect, useMemo, useState} from 'react';
import s from "../PumpingPower/PumpingPower.module.scss";
import CheatPowerHeader from "./CheatPowerHeader";
import CheatPowerItem from "./CheatPowerItem/CheatPowerItem";
import CheatPowerListHeader from "./CheatPowerListHeader/CheatPowerListHeader";
import {ProjectsAPI} from "../../../API/ProjectsAPI";
import {AlertContext} from "../../../App";
import {defaultCatch} from "../../../utils/tools";
import Loading from "../../UI/Loading/Loading";
import EmptyData from "../../UI/EmptyData/EmptyData";

const CheatPower = ({servers, configs, projects, setModalConfigFilter}) => {
    const addAlert = useContext(AlertContext);
    const [selectedConfigs, setSelectedConfigs] = useState(!!localStorage.getItem('CheatPower') ? localStorage.getItem('CheatPower').split(',') : []);
    const [searchData, setSearchData] = useState('');
    const [configFilter, setConfigFilter] = useState('');
    const [qtyDaysStat, setQtyDaysStat] = useState(5);
    const [dates, setDates] = useState(null);
    const [stats, setStats] = useState(null);

    const filteredStats = useMemo(() => {
        if (configFilter && configFilter != 1) {
            return stats?.filter(stat => configs[configFilter].servers.find(server => server.id === stat.server?.id));
        } else {
            let arr = [];
            for (let key in configs) {
                if (!selectedConfigs.includes(key)) arr = [...arr, ...configs[key].servers];
            }
            return stats?.filter(stat => arr.find(server => server.id === stat.server?.id));
        }
    }, [stats, configFilter, selectedConfigs]);

    useEffect(() => localStorage.setItem('CheatPower', selectedConfigs), [selectedConfigs]);

    useEffect(() => {
        if (!servers.isLoading) {
            const startDate = dates?.startDate ?? new Date(Date.now() - 86400000 * qtyDaysStat).toISOString().slice(0, 10);
            const endDate = dates?.endDate ?? new Date().toISOString().slice(0, 10);
            ProjectsAPI.statisticClick.getServersStat(startDate, endDate).then(resp => {
                setStats(
                    resp.result.map(item => {
                        return {count: item.count, server: servers.data?.result.find(server => server.id === item.serverId)}
                    })
                );
            }).catch(e => defaultCatch(e, addAlert));
        }
    }, [qtyDaysStat, dates, servers.isLoading]);

    return (
        <div className={s.main}>
            <CheatPowerHeader dates={dates}
                              setDates={setDates}
                              configs={configs}
                              setSearchData={setSearchData}
                              searchData={searchData}
                              setConfigFilter={setConfigFilter}
                              setQtyDaysStat={setQtyDaysStat}
                              setModalConfigFilter={setModalConfigFilter}
                              setSelectedConfigs={setSelectedConfigs}
                              selectedConfigs={selectedConfigs}/>
            <div className={s.content}>
                <CheatPowerListHeader/>
                <div className={s.list}>
                    {servers.isLoading && <Loading/>}
                    {!stats && <EmptyData/>}
                    {filteredStats?.map(stat =>
                        <CheatPowerItem key={stat.server.id} data={stat} projects={projects} searchData={searchData}/>)}
                </div>
            </div>
        </div>
    );
};

export default CheatPower;