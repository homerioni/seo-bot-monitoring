import React, {useState} from 'react';
import s from './ServerDetails.module.scss';
import ServerTabs from "./ServerTabs/ServerTabs";
import ServerThreads from "./ServerThreads/ServerThreads";
import ServerInfo from "./ServerInfo/ServerInfo";
import ServerConfig from "./ServerConfig/ServerConfig";
import ServerDamage from "./ServerDamage/ServerDamage";
import {useQuery, useQueryClient} from "react-query";
import {PMService} from "../../../../API/PMService";
import ServerEthernet from "./ServerEthernet/ServerEthernet";
import ServerBAS from "./ServerBAS/ServerBAS";

const ServerDetails = ({server, projectsData, setModalConfirm, setModalLoadLogs, setModalDist, setModalDamage, isClosingDetails}) => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState(0);
    const threads = useQuery(`threads${server.id}`, () => server?.modes?.length ? PMService.settings.getAllById(server.id) : false,
        {
            keepPreviousData: true,
            onError: () => {},
            onSuccess: resp => {
                let isSentActive = false;
                resp.result?.forEach(thread => thread.isActive ? isSentActive = true : '');
                queryClient.setQueryData('servers', (servers) => {
                    return {
                        ...servers,
                        result: servers.result.map(item => item.id == server.id ? {...item, isSentActive} : item)
                    };
                });
            }
        });

    const tabContents = [
        <ServerThreads threads={threads} setModalConfirm={setModalConfirm} setModalDist={setModalDist}/>,
        <ServerInfo server={server} projectsData={projectsData}/>,
        <ServerConfig server={server}/>,
        <ServerDamage threads={threads.data?.result} setModalConfirm={setModalConfirm} setModalDamage={setModalDamage}/>,
        <ServerEthernet token={server?.token} serverId={server?.id}/>,
        <ServerBAS server={server} queryClient={queryClient} setModalConfirm={setModalConfirm}/>
    ];

    return (
        <div className={`${s.main} ${isClosingDetails ? s.closing : ''}`}>
            <ServerTabs activeTab={activeTab} setActiveTab={setActiveTab} setModalLoadLogs={setModalLoadLogs} server={server}/>
            {tabContents[activeTab]}
        </div>
    );
};

export default ServerDetails;