import React, {useContext, useMemo, useState} from 'react';
import Management from "../components/Management/Management";
import ManageHeader from "../components/Management/ManageHeader/ManageHeader";
import ModalManagement from "../components/modals/ModalManagement/ModalManagement";
import {useQuery, useQueryClient} from "react-query";
import {PMService} from "../API/PMService";
import {AlertContext} from "../App";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";

const ManagementPage = () => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('PROMOTION');
    const [searchData, setSearchData] = useState('');
    const [modalManagement, setModalManagement] = useState({isOpen: false});
    const management = useQuery('management', () => PMService.task.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const appiumProjects = useQuery('appiumProjects', () => PMService.projectPromotion.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const taskData = useMemo(() => {
        return management.data?.result?.filter(item => item.project.name.includes(searchData) || item.project.domain.includes(searchData));
    }, [management.data, searchData]);
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className='main-content-box'>
                <ManageHeader activeTab={activeTab} setActiveTab={setActiveTab} searchData={searchData} setSearchData={setSearchData} setModalManagement={setModalManagement}/>
                <div className="main-content">
                    <Management activeTab={activeTab} setModalManagement={setModalManagement} taskData={taskData} addAlert={addAlert} queryClient={queryClient} setModalConfirm={setModalConfirm}/>
                </div>
            </div>
            {modalManagement.isOpen &&
                <ModalManagement setModalManagement={setModalManagement}
                                 type={modalManagement.type}
                                 data={modalManagement.data}
                                 edit={modalManagement.edit}
                                 appiumProjects={appiumProjects}
                                 addAlert={addAlert}
                                 queryClient={queryClient}/>}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default ManagementPage;