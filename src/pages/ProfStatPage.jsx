import React, {useMemo, useState} from 'react';
import ProfStatHeader from "../components/headers/ProfStatHeader";
import ProfStat from "../components/ProfStat/ProfStat";
import {PMService} from "../API/PMService";
import Loading from "../components/UI/Loading/Loading";
import ModalProfileStat from "../components/modals/ModalProfileStat/ModalProfileStat";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import {useQuery} from "react-query";

const ProfStatPage = ({servers}) => {
    const [searchData, setSearchData] = useState('');
    const [filterData, setFilterData] = useState(null);
    const [activeGlobalTab, setActiveGlobalTab] = useState(1);
    const [modalProfStat, setModalProfStat] = useState({isOpen: false, server: null, reqData: null, rangeData: null, folder: null, ageData: null});
    const settings = useQuery('profStat',
        () => PMService.profileStatistic.getAll(),
        {keepPreviousData: false, refetchOnWindowFocus: false});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    const settingsData = useMemo(() => {
        if (settings.data && servers.data) {
            const arr = [];
            settings.data.result?.forEach(item => {
                const server = servers.data?.result.find(el => el.id === item.serverId);
                if ((server.ip.includes(searchData) || server.name.includes(searchData))
                    && (filterData === null || server.purpose.toUpperCase() === filterData.purpose.toUpperCase())) {
                    item.settings.forEach(setting => {
                        arr.push({id: setting.id, folder: setting.name, server});
                    });
                }
            });
            return arr;
        }
    }, [settings.data, servers.data, searchData, filterData]);

    return (
        <>
            <div className='main-content-box'>
                <ProfStatHeader servers={servers}
                                settings={settings}
                                filterData={filterData}
                                setFilterData={setFilterData}
                                setSearchData={setSearchData}
                                setActiveGlobalTab={setActiveGlobalTab}
                                activeGlobalTab={activeGlobalTab}/>
                <div className='main-content'>
                    {settings.isLoading || servers.isLoading ? <Loading/> : ''}
                    <ProfStat settingsData={settingsData}
                              setModalProfStat={setModalProfStat}
                              setModalConfirm={setModalConfirm}
                              activeGlobalTab={activeGlobalTab}/>
                </div>
            </div>
            {modalProfStat.isOpen ?
                <ModalProfileStat setModalProfStat={setModalProfStat}
                                  folder={modalProfStat.folder}
                                  server={modalProfStat.server}
                                  reqData={modalProfStat.reqData}
                                  rangeData={modalProfStat.rangeData}
                                  ageData={modalProfStat.ageData}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default ProfStatPage;