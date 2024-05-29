import React, {useMemo, useState} from 'react';
import s from './DashLocationsItem.module.scss';
import DashLocationsItemHeader from "./DashLocationsItemHeader/DashLocationsItemHeader";
import DashLocationsListItem from "./DashLocationsListItem/DashLocationsListItem";

const DashLocationsItem = ({data}) => {
    const [filterStatus, setFilterStatus] = useState(null);
    const filteredServers = useMemo(() => {
        return data?.servers?.filter(server => {
            if (filterStatus === null) return true;
            if (filterStatus === 'error') return !!server.error;
            return server.status === filterStatus;
        });
    }, [data, filterStatus]);

    return (
        <div className={`${s.main} ${filteredServers?.length > 21 ? s.long : ''}`}>
            <DashLocationsItemHeader data={data} setFilterStatus={setFilterStatus} filterStatus={filterStatus}/>
            <div className={`${s.list} ${filteredServers?.length > 21 ? s.long : ''}`}>
                {filteredServers?.map((server, i) => <DashLocationsListItem key={server.id} server={server} index={i}/>)}
            </div>
        </div>
    );
};

export default DashLocationsItem;