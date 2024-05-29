import React from 'react';
import LocationsContentHeader from "./LocationsContentHeader/LocationsContentHeader";
import LocationsContent from "./LocationsContent/LocationsContent";

const Locations = ({locationsData, servers}) => {
    return (
        <div>
            <LocationsContentHeader/>
            <LocationsContent locationsData={locationsData} servers={servers}/>
        </div>
    );
};

export default Locations;