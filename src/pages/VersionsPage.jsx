import React, {useState} from 'react';
import VersionsHeader from "../components/headers/VersionsHeader";
import Versions from "../components/Versions/Versions";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import ModalVersion from "../components/modals/ModalVersion/ModalVersion";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import ModalUpdate from "../components/modals/ModalUpdate/ModalUpdate";
import Loading from "../components/UI/Loading/Loading";

const VersionsPage = ({servers}) => {
    const [isOpenModalVersion, setIsOpenModalVersion] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [status, setStatus] = useState(null);
    const version = useQuery('version', () => PMService.version.get(), {keepPreviousData: true});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <div className='main-content-box'>
            <VersionsHeader version={version}
                            setIsOpenModalVersion={setIsOpenModalVersion}
                            setModalConfirm={setModalConfirm}
                            setStatus={setStatus}
                            setIsOpenModalUpdate={setIsOpenModalUpdate}/>
            <div className="main-content">
                {version.isLoading || servers.isLoading ? <Loading/> : ''}
                <Versions servers={servers} version={version} status={status}/>
            </div>
            {isOpenModalVersion ? <ModalVersion setIsOpenModalVersion={setIsOpenModalVersion}/> : ''}
            {isOpenModalUpdate ? <ModalUpdate setIsOpenModalUpdate={setIsOpenModalUpdate} setStatus={setStatus} servers={servers} version={version}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </div>
    );
};

export default VersionsPage;