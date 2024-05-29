import React, {useState} from 'react';
import ConfigPCHeader from "../components/headers/ConfigPCHeader";
import ConfigPC from "../components/ConfigPC/ConfigPC";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import ModalConfig from "../components/modals/ModalConfig/ModalConfig";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import Loading from "../components/UI/Loading/Loading";

const ConfigPCPage = () => {
    const accessory = useQuery('accessory', () => PMService.accessory.getAll(), {keepPreviousData: true});
    const [modalConfig, setModalConfig] = useState({isOpen: false, data: null, type: ''});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className='main-content-box'>
                <ConfigPCHeader qty={accessory.data?.result.length}/>
                <div className='main-content'>
                    {accessory.isLoading && <Loading/>}
                    <ConfigPC setModalConfig={setModalConfig} accessory={accessory} setModalConfirm={setModalConfirm}/>
                </div>
            </div>
            {modalConfig.isOpen && <ModalConfig data={modalConfig.data} type={modalConfig.type} setModalConfig={setModalConfig}/>}
            {modalConfirm.isOpen && <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/>}
        </>
    );
};

export default ConfigPCPage;