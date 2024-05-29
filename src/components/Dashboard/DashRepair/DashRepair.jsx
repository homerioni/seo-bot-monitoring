import React, {useMemo, useState} from 'react';
import s from './DashRepair.module.scss';
import DashRepairHeader from "./DashRepairHeader";
import DashRepairContent from "./DashRepairContent/DashRepairContent";

const DashRepair = ({servers}) => {
    const [searchData, setSearchData] = useState('');
    const [allView, setAllView] = useState(window.innerWidth > 768 ? null : false);
    const filteredServers = useMemo(() => {
        if (allView === null || allView) return servers.data?.result?.filter(server => !!server.error);

        return servers.data?.result?.filter(server => !!server.error).slice(0, 4);
    }, [servers, searchData, allView]);

    return (
        <div className={s.main}>
            <DashRepairHeader setSearchData={setSearchData} searchData={searchData}/>
            <DashRepairContent isLoading={servers.isLoading} filteredServers={filteredServers} searchData={searchData} allView={allView} setAllView={setAllView}/>
        </div>
    );
};

export default DashRepair;