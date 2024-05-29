import React, {useEffect, useMemo, useState} from 'react';
import s from './AveragePower.module.scss';
import AveragePowerHeader from "./AveragePowerHeader";
import AveragePowerContent from "./AveragePowerContent/AveragePowerContent";
import Loading from "../../UI/Loading/Loading";

const AveragePower = ({configs, servers, groups, serversIsHaveBAS, setModalConfigFilter}) => {
    const [selectedConfigs, setSelectedConfigs] = useState(!!localStorage.getItem(`averagePower${!!serversIsHaveBAS ? 'BAS' : ''}`) ? localStorage.getItem(`averagePower${!!serversIsHaveBAS ? 'BAS' : ''}`).split(',') : []);
    const [selectedGroup, setSelectedGroup] = useState(localStorage.getItem('averagePowerSelectedGroup'));
    const [qtyDaysStat, setQtyDaysStat] = useState(5);
    const [dates, setDates] = useState(null);
    const filteredConfigs = useMemo(() => {
        const result = [];

        for (let key in configs) {
            const config = {data: configs[key].data, id: key};
            config.servers = configs[key]?.servers.filter(server => server.groups.find(group => group.id == selectedGroup));
            if (serversIsHaveBAS) {
                config.servers = config.servers?.filter(server => serversIsHaveBAS.data?.result.find(e => e.serverId === server.id));
            }
            if (config.servers?.length && !selectedConfigs.includes(key)) {
                const name = `${config.data.qtyCpu > 1 ? `x${config.data.qtyCpu} ` : ''}${config.data.cpuName} ${config.data.valueRam}Gb`;
                result.push({result: config, name});
            }
        }

        result.sort((a, b) => {
            if (a.result.servers.length > b.result.servers.length) return -1;
            if (a.result.servers.length < b.result.servers.length) return 1;
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        });

        return result;
    }, [configs, selectedGroup, selectedConfigs, serversIsHaveBAS?.data]);

    useEffect(() => localStorage.setItem('averagePowerSelectedGroup', selectedGroup), [selectedGroup]);
    useEffect(() => localStorage.setItem(`averagePower${!!serversIsHaveBAS ? 'BAS' : ''}`, selectedConfigs), [selectedConfigs]);

    return (
        <div className={s.main}>
            {(groups.isLoading || servers.isLoading) && <Loading/>}
            <AveragePowerHeader isBAS={!!serversIsHaveBAS}
                                groups={groups}
                                setSelectedGroup={setSelectedGroup}
                                setModalConfigFilter={setModalConfigFilter}
                                selectedConfigs={selectedConfigs}
                                setSelectedConfigs={setSelectedConfigs}
                                selectedGroup={selectedGroup}
                                setQtyDaysStat={setQtyDaysStat}
                                setDates={setDates}
                                dates={dates}/>
            <AveragePowerContent filteredConfigs={filteredConfigs} qtyDaysStat={qtyDaysStat} dates={dates} selectedGroup={selectedGroup} isBAS={!!serversIsHaveBAS}/>
        </div>
    );
};

export default AveragePower;