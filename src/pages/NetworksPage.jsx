import React, {useState} from 'react';
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import NetworksHeader from "../components/headers/NetworksHeader";
import Networks from "../components/Networks/Networks";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import ModalNetwork from "../components/modals/ModalNetwork/ModalNetwork";
import NetworksFilter from "../components/Networks/NetworksFilter/NetworksFilter";

const NetworksPage = ({servers}) => {
    const [searchData, setSearchData] = useState('');
    const [activeTab, setActiveTab] = useState('ROUTER');
    const routers = useQuery('ROUTER', () => PMService.network.getAll('ROUTER'));
    const roots = useQuery('ROOT', () => PMService.network.getAll('ROOT'));
    const [modalNetwork, setModalNetwork] = useState({isOpen: false, type: null, data: null});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className='main-content-box networksPage'>
                <NetworksHeader searchData={searchData} setSearchData={setSearchData} activeTab={activeTab} setActiveTab={setActiveTab} setModalNetwork={setModalNetwork}/>
                <div className="main-content networksPage">
                    <NetworksFilter activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <Networks setModalConfirm={setModalConfirm}
                              searchData={searchData} activeTab={activeTab}
                              networks={activeTab === 'ROUTER' ? routers : roots}
                              setModalNetwork={setModalNetwork}/>
                </div>
            </div>
            {modalNetwork.isOpen && <ModalNetwork setModalNetwork={setModalNetwork} servers={servers} type={modalNetwork.type} data={modalNetwork.data}/>}
            {modalConfirm.isOpen && <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/>}
        </>
    );
};

export default NetworksPage;