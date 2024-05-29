import React, {useMemo, useState} from 'react';
import ModalLocation from "../components/modals/ModalLocation/ModalLocation";
import Loading from "../components/UI/Loading/Loading";
import {useParams} from "react-router";
import Location from "../components/Location/Location";
import LocationPageHeader from "../components/headers/LocationPageHeader";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import ModalDamage from "../components/modals/ModalDamage/ModalDamage";

const LocationPage = ({locations, servers, projects, accessory}) => {
    const {id} = useParams();
    const [modalDamage, setModalDamage] = useState({isOpen: false, data: null});
    const [modalLocation, setModalLocation] = useState({isOpen: false, data: null});
    const location = useMemo(() => {
        return locations.data?.result.find(location => location.id == id);
    }, [locations, id]);
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });
    const qtyServers = servers.data?.result.filter(server => server.location?.id == location.id).length;

    return (
        <>
            <div className='main-content-box'>
                <LocationPageHeader data={location} setModalConfirm={setModalConfirm} setModalLocation={setModalLocation} qtyServers={qtyServers}/>
                <div className='main-content'>
                    {locations.isLoading ?
                        <Loading/>
                        : <Location locationId={id} servers={servers} projects={projects} setModalConfirm={setModalConfirm} locations={locations} accessory={accessory} setModalDamage={setModalDamage}/>}
                </div>
            </div>
            {modalLocation.isOpen && <ModalLocation setModalLocation={setModalLocation} data={modalLocation.data}/>}
            {modalDamage.isOpen ? <ModalDamage setModalDamage={setModalDamage} data={modalDamage.data}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default LocationPage;