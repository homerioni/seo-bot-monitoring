import React, {useEffect, useState} from 'react';
import MainHeader from "../components/headers/MainHeader";
import Home from "../components/Home/Home";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import ModalLoadLogs from "../components/modals/ModalLoadLogs/ModalLoadLogs";
import ModalDist from "../components/modals/ModalDist/ModalDist";
import ModalLog from "../components/modals/ModalLog/ModalLog";
import ModalServer from "../components/modals/ModalServer/ModalServer";
import ModalDamage from "../components/modals/ModalDamage/ModalDamage";

const MainPage = ({servers, projects, locations, accessory}) => {
    const [searchData, setSearchData] = useState('');
    const [filterData, setFilterData] = useState({groups: [], locations: [], isSentActive: [], projects: []});
    const [modalServer, setModalServer] = useState({isOpen: false, data: null});
    const [modalLoadLogs, setModalLoadLogs] = useState({isOpen: false, serverId: null});
    const [modalDist, setModalDist] = useState({isOpen: false, data: null});
    const [modalDamage, setModalDamage] = useState({isOpen: false, data: null});
    const [modalLog, setModalLog] = useState({isOpen: false, data: null});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className='main-content-box'>
                <MainHeader
                    searchData={searchData}
                    setSearchData={setSearchData}
                    serversData={servers.data?.result}
                    projectsData={projects.data?.result}
                    setModalConfirm={setModalConfirm}
                    setModalLog={setModalLog}
                    setModalServer={setModalServer}
                    setFilterData={setFilterData}
                    filterData={filterData}
                    locationsData={locations.data?.result}
                />
                <div className="main-content">
                    <Home searchData={searchData}
                          servers={servers}
                          projects={projects}
                          locations={locations}
                          setModalConfirm={setModalConfirm}
                          setModalDist={setModalDist}
                          setModalLoadLogs={setModalLoadLogs}
                          setModalServer={setModalServer}
                          setModalDamage={setModalDamage}
                          filterData={filterData}
                    />
                </div>
            </div>
            {modalServer.isOpen ? <ModalServer data={modalServer.data} setModalServer={setModalServer} projects={projects} accessory={accessory} locations={locations}/> : ''}
            {modalLoadLogs.isOpen ? <ModalLoadLogs modalLoadLogs={modalLoadLogs} setModalLoadLogs={setModalLoadLogs}/> : ''}
            {modalDist.isOpen ? <ModalDist data={modalDist.data} setModalDist={setModalDist}/> : ''}
            {modalDamage.isOpen ? <ModalDamage setModalDamage={setModalDamage} data={modalDamage.data}/> : ''}
            {modalLog.isOpen ? <ModalLog data={modalLog.data} setModalLog={setModalLog}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default MainPage;