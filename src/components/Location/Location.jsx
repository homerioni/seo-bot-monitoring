import React, {useMemo} from 'react';
import ServersBox from "../ServersBox/ServersBox";
import LocationTemperature from "./LocationTemperature/LocationTemperature";

const Location = ({servers, projects, locationId, setModalConfirm, locations, accessory, setModalDamage}) => {
    const thisServers = useMemo(() => {
        return {servers: servers.data?.result.filter(server => server.location?.id == locationId)};
    }, [servers, locationId]);

    return (
        <>
            {/*<LocationTemperature/>*/}
            <ServersBox setModalConfirm={setModalConfirm} servers={servers} thisServers={thisServers} projects={projects} locations={locations} accessory={accessory} setModalDamage={setModalDamage}/>
        </>
    );
};

export default Location;