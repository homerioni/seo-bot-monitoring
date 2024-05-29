import React, {useMemo, useState} from 'react';
import LocationsHeader from "../components/headers/LocationsHeader";
import Locations from "../components/Locations/Locations";
import ModalLocation from "../components/modals/ModalLocation/ModalLocation";
import Loading from "../components/UI/Loading/Loading";

const LocationsPage = ({locations, servers}) => {
    const [searchData, setSearchData] = useState('');
    const [modalLocation, setModalLocation] = useState({isOpen: false, data: null});
    const filterLocations = useMemo(() => {
        return locations.data?.result.filter(loc => loc.name.includes(searchData));
    }, [locations, searchData]);

    return (
        <>
            <div className='main-content-box'>
                <LocationsHeader setModalLocation={setModalLocation} searchData={searchData} setSearchData={setSearchData} locations={locations}/>
                <div className='main-content'>
                    {locations.isLoading ?
                        <Loading/>
                        : <Locations locationsData={filterLocations} servers={servers}/>}
                </div>
            </div>
            {modalLocation.isOpen && <ModalLocation setModalLocation={setModalLocation} data={modalLocation.data}/>}
        </>
    );
};

export default LocationsPage;