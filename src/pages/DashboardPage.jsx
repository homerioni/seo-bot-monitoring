import React, {useMemo, useState} from 'react';
import DashboardHeader from "../components/headers/DashboardHeader";
import Dashboard from "../components/Dashboard/Dashboard";
import ModalProfileSum from "../components/modals/dashboardModals/ModalProfileSum/ModalProfileSum";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import {getConfigs} from "../components/Dashboard/dashboardTools";
import ModalConfigFilter from "../components/modals/dashboardModals/ModalConfigFilter/ModalConfigFilter";
import ModalConfigFullFilter from "../components/modals/dashboardModals/ModalConfigFullFilter/ModalConfigFullFilter";

const DashboardPage = ({servers, projects, locations}) => {
    const [modalProfSum, setModalProfSum] = useState(false);
    const [modalConfigFilter, setModalConfigFilter] = useState({isOpen: false, title: '', value: [], onChange: () => {}});
    const [modalConfigFullFilter, setModalConfigFullFilter] = useState({isOpen: false, title: 'test', value: [], onChange: () => {}});
    const [profSumGroups, setProfSumGroups] = useState(!!localStorage.getItem('profSumGroups') ? localStorage.getItem('profSumGroups').split(',') : []);
    const groups = useQuery('groups', () => PMService.group.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const configs = useMemo(() => getConfigs(servers), [servers.data]);
    const serversIsHaveBAS = useQuery('serversBAS', () => PMService.performanceCycle.get(servers.data?.result.map(e => e.id)), {keepPreviousData: true, refetchOnWindowFocus: false, retry: false, enabled: !servers.isLoading});

    return (
        <>
            <div className='full-page'>
                <DashboardHeader/>
                <Dashboard profSumGroups={profSumGroups}
                           setModalProfSum={setModalProfSum}
                           setModalConfigFilter={setModalConfigFilter}
                           groups={groups}
                           servers={servers}
                           projects={projects}
                           locations={locations}
                           serversIsHaveBAS={serversIsHaveBAS}
                           configs={configs}/>
            </div>
            {modalProfSum &&
                <ModalProfileSum setModalProfSum={setModalProfSum} groups={groups} setProfSumGroups={setProfSumGroups} profSumGroups={profSumGroups}/>}
            {modalConfigFilter.isOpen &&
                <ModalConfigFilter setModalConfigFilter={setModalConfigFilter} title={modalConfigFilter.title}
                                   value={modalConfigFilter.value} onChange={modalConfigFilter.onChange}
                                   configs={configs}/>}
            {modalConfigFullFilter.isOpen &&
                <ModalConfigFullFilter setModalConfigFullFilter={setModalConfigFullFilter} title={modalConfigFullFilter.title}
                                   value={modalConfigFullFilter.value} onChange={modalConfigFullFilter.onChange}
                                   configs={configs}/>}
        </>
    );
};

export default DashboardPage;