import React from 'react';
import s from './LocationsContent.module.scss';
import LocationsItem from "./LocationsItem/LocationsItem";

const LocationsContent = ({locationsData, servers}) => {
    return (
        <div className={s.main}>
            {locationsData?.map(location => {
                const serversQty = servers.data?.result.filter(server => server.location?.id == location.id).length;
                return <LocationsItem key={location.id} data={location} serversQty={serversQty}/>;
            })}
        </div>
    );
};

export default LocationsContent;