import React, {useEffect, useState} from 'react';
import s from './Home.module.scss';
import HomeHeader from "./HomeHeader/HomeHeader";
import Servers from "./Servers/Servers";

const Home = ({searchData, servers, projects, setModalConfirm, setModalLoadLogs, setModalDist, setModalServer, serverIds, setModalDamage, filterData, locations}) => {
    const [projectsData, setProjectsData] = useState(null);
    useEffect(() => {
        let data = {};
        projects.data?.result?.forEach(project => {
            project.settingResponse?.servers?.forEach(server => {
                if (data[server.serverId]) {
                    data[server.serverId].push({id: project.id, name: project.name});
                } else {
                    data[server.serverId] = [{id: project.id, name: project.name}];
                }
            });
        });
        setProjectsData(data);
    }, [projects]);

    return (
        <div className={s.main}>
            <HomeHeader/>
            <Servers searchData={searchData}
                     servers={servers}
                     projectsData={projectsData}
                     setModalConfirm={setModalConfirm}
                     setModalLoadLogs={setModalLoadLogs}
                     setModalDist={setModalDist}
                     setModalServer={setModalServer}
                     serverIds={serverIds}
                     setModalDamage={setModalDamage}
                     filterData={filterData}
                     locations={locations}
            />
        </div>
    );
};

export default Home;