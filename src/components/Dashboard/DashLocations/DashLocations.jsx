import React, {useMemo, useState} from 'react';
import s from './DashLocations.module.scss';
import DashLocationsHeader from "./DashLocationsHeader";
import DashLocationsItem from "./DashLocationsItem/DashLocationsItem";

const DashLocations = ({locations, servers}) => {
    const [searchData, setSearchData] = useState('');
    const filteredLocations = useMemo(() => {
        const statusAll = {on: 0, off: 0, part: 0, error: 0};
        const locationsFiltered = locations.data?.result?.filter(loc => loc.name.includes(searchData));
        const serversLocFilter = {};
        servers.data?.result?.forEach(server => {
            if (server.location) {
                switch (server.status) {
                    case 'ACTIVE': statusAll.on += 1; break;
                    case 'NON_ACTIVE': statusAll.off += 1; break;
                    case 'PARTIALLY_ACTIVE': statusAll.part += 1; break;
                }

                if (!!server.error) statusAll.error += 1;

                if (serversLocFilter[server.location.id]) {
                    serversLocFilter[server.location.id].push(server);
                } else {
                    serversLocFilter[server.location.id] = [server];
                }
            }
        });
        const locationsData = locationsFiltered?.map(loc => {
            const servers = serversLocFilter[loc.id] ?
                serversLocFilter[loc.id].sort((a, b) => {
                    if (a.status === b.status) return 0;
                    if (a.status === 'ACTIVE') return -1;
                    if (b.status === 'ACTIVE') return 1;
                    if (a.status === 'PARTIALLY_ACTIVE') return -1;
                    if (b.status === 'PARTIALLY_ACTIVE') return 1;
                })
                : [];

            return {id: loc.id, name: loc.name, servers}
        });

        return {statusAll, locations: locationsData};
    }, [locations.data, servers.data, searchData]);

    return (
        <div className={s.main}>
            <DashLocationsHeader statusData={filteredLocations?.statusAll} searchData={searchData} setSearchData={setSearchData}/>
            <div className={s.content}>
                {filteredLocations?.locations?.map(loc => <DashLocationsItem key={loc.id} data={loc}/>)}
            </div>
        </div>
    );
};

export default DashLocations;