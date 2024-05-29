import React, {useState} from 'react';
import SettingsHeader from "../components/headers/SettingsHeader";
import Settings from "../components/Settings/Settings";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";

const SettingsPage = () => {
    const settings = useQuery('settings', () => PMService.settingsType.getAll(), {keepPreviousData: true});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <div className='main-content-box'>
            <SettingsHeader/>
            <div className="main-content">
                <Settings settings={settings} setModalConfirm={setModalConfirm}/>
            </div>
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </div>
    );
};

export default SettingsPage;