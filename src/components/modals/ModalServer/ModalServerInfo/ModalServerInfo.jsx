import React, {useContext, useMemo, useState} from 'react';
import s from './ModalServerInfo.module.scss';
import {useQuery, useQueryClient} from "react-query";
import {AlertContext} from "../../../../App";
import {ProjectsAPI} from "../../../../API/ProjectsAPI";
import ServerInfoFormHoc from "./ServerInfoForm/ServerInfoFormHoc";
import {PMService} from "../../../../API/PMService";
import ProfileStatisticFormHoc from "./ProfileStatisticForm/ProfileStatisticFormHoc";
import ServerConfigForm from "./ServerConfigForm/ServerConfigForm";

const ModalServerInfo = ({server, setTabs, setServer, setIsClose, isShow, projectsResult, accessory, locations}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const config = useQuery(`config${server?.id}`, () => server?.id ? PMService.accessory.getForServer(server.id) : false, {keepPreviousData: true, refetchOnWindowFocus: false, refetchOnMount: true});
    const projects = useQuery('projects', () => ProjectsAPI.project.getAll(), {keepPreviousData: true, onError: () => {}});
    const antiCaptcha = useQuery('antiCaptcha', () => PMService.antiCaptcha.getAll(), {keepPreviousData: true});
    const [tabActive, setTabActive] = useState(0);
    const accessoryData = useMemo(() => {
        const data = {PROCESSOR: [], HARD_DRIVE: [], RAM: [], VIDEO_ADAPTER: [], POWER_SUPPLY: [], THERMAL_PASTE: []};
        accessory.data?.result.forEach(item => data[item.type].push(item));
        return data;
    }, [accessory]);

    return (
        <div style={{display: isShow ? '' : 'none'}}>
            <div className={s.tabs}>
                <button className={`${s.tab} ${tabActive === 0 ? s.active : ''}`} onClick={() => setTabActive(0)}>Информация</button>
                <button className={`${s.tab} ${tabActive === 1 ? s.active : ''}`} onClick={() => setTabActive(1)}>Конфигурация</button>
                <button className={`${s.tab} ${tabActive === 2 ? s.active : ''}`} onClick={() => setTabActive(2)}>Статистика профилей</button>
            </div>
            <ServerInfoFormHoc server={server}
                               projects={projects}
                               locations={locations}
                               addAlert={addAlert}
                               projectsResult={projectsResult}
                               setServer={setServer}
                               setTabs={setTabs}
                               setIsClose={setIsClose}
                               antiCaptcha={antiCaptcha}
                               queryClient={queryClient}
                               isShow={tabActive === 0}/>
            {!config.isLoading && <ServerConfigForm isShow={tabActive === 1} server={server} config={config} accessoryData={accessoryData}/>}
            <ProfileStatisticFormHoc serverId={server?.id} isShow={tabActive === 2} addAlert={addAlert} queryClient={queryClient}/>
        </div>
    );
};

export default ModalServerInfo;