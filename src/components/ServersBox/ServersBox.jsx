import React, {useState} from 'react';
import Home from "../Home/Home";
import ModalServer from "../modals/ModalServer/ModalServer";
import ModalLoadLogs from "../modals/ModalLoadLogs/ModalLoadLogs";
import ModalDist from "../modals/ModalDist/ModalDist";

const ServersBox = ({setModalConfirm, thisServers, servers, projects, accessory, locations, setModalDamage}) => {
    const [modalServer, setModalServer] = useState({isOpen: false, data: null});
    const [modalLoadLogs, setModalLoadLogs] = useState({isOpen: false, serverId: null});
    const [modalDist, setModalDist] = useState({isOpen: false, data: null});

    return (
        <>
            <Home serverIds={thisServers?.servers?.length ? thisServers?.servers?.map(el => el.id) : []}
                  servers={servers}
                  projects={projects}
                  locations={locations}
                  setModalConfirm={setModalConfirm}
                  setModalDist={setModalDist}
                  setModalLoadLogs={setModalLoadLogs}
                  setModalServer={setModalServer}
                  setModalDamage={setModalDamage}
            />
            {modalServer.isOpen ? <ModalServer data={modalServer.data} setModalServer={setModalServer} projects={projects} accessory={accessory} locations={locations}/> : ''}
            {modalLoadLogs.isOpen ? <ModalLoadLogs modalLoadLogs={modalLoadLogs} setModalLoadLogs={setModalLoadLogs}/> : ''}
            {modalDist.isOpen ? <ModalDist data={modalDist.data} setModalDist={setModalDist}/> : ''}
        </>
    );
};

export default ServersBox;